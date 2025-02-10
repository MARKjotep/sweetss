import * as babel from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { file, write } from "bun";
import fg from "fast-glob";
import {
  JSXEmptyExpression,
  Expression,
  JSXAttribute,
  VariableDeclarator,
  PrivateName,
  V8IntrinsicIdentifier,
  ArgumentPlaceholder,
  SpreadElement,
  CallExpression,
} from "@babel/types";

export class SweetShaker {
  files: string[] = [];
  classes = new Set<string>();
  importMap = new Map<string, string>();
  resolvedImports = new Map<string, string>();
  StateValues = new Map<string, Set<string>>();
  constructor({ include = [] }: { include?: string[] } = {}) {
    //
    include.forEach((i) => this.classes.add(i));
  }
  async load(src: string) {
    const files = await fg(src);

    for (const _f of files) {
      const content = await file(_f).text();
      const ast = babel.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "typescript", "decorators"],
      });
      traverse(ast, {
        AssignmentExpression: (path) => {
          const PN = path.node.left;
          if (PN.type === "MemberExpression") {
            if (getName(PN.property) === "value") {
              const STN = getName(PN.object);
              if (STN) {
                const BN = path.scope.getBinding(STN);
                if (BN) {
                  const init = getInit(BN.path.node);
                  if (init && getName(init) === "State") {
                    handleAssignmentExpression.call(this, path.node.right, STN);
                  }
                }
              }
            }
          }
        },
        CallExpression: (path) => {
          const PN = path.node;
          if (PN.type === "CallExpression") {
            const args = PN.arguments;
            const PC = PN.callee;
            const GN = getName(PC);
            if (GN && ["add", "remove", "toggle"].includes(GN)) {
              if (PC.type === "MemberExpression") {
                const GCN = getName(PC.object);
                if (GCN) {
                  const BN = path.scope.getBinding(GCN);
                  if (BN) {
                    const init = getInit(BN.path.node);
                    if (init) {
                      if (getName(init) === "$") {
                        args.forEach((ar) => {
                          handleExpression.call(this, ar, path);
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        },
        JSXAttribute: (path) => {
          if (path.node.name.name === "class") {
            const value = path.node.value;
            if (value && value.type === "StringLiteral") {
              handleExpression.call(this, value, path);
            } else if (value && value.type === "JSXExpressionContainer") {
              handleExpression.call(this, value.expression, path);
            } else {
            }
          }
        },
      });
    }
    return this;
  }

  setState(key: string, val: string) {
    if (!this.StateValues.has(key)) {
      this.StateValues.set(key, new Set([val]));
    } else {
      this.StateValues.get(key)!.add(val);
    }
  }
  async export(dir: string, name: string = "shaker") {
    const JSN = JSON.stringify([...this.classes.values()].filter((e) => e));
    await write(dir + "/" + name + ".json", JSN);
  }
  get shaker() {
    return [...this.classes.values()];
  }
}

function handleAssignmentExpression(
  this: SweetShaker,
  node: Expression | PrivateName | SpreadElement | Expression,
  key: string,
) {
  switch (node.type) {
    case "StringLiteral":
      this.setState(key, node.value);
      break;
    case "MemberExpression":
      handleAssignmentExpression.call(this, node.property, key);
      break;
    case "Identifier":
      this.setState(key, node.name);
      break;
    case "ArrayExpression":
      node.elements.forEach((e) => {
        if (e) handleAssignmentExpression.call(this, e, key);
      });
      break;
    default:
      break;
  }
}

async function handleExpression(
  this: SweetShaker,
  node:
    | JSXEmptyExpression
    | Expression
    | ArgumentPlaceholder
    | SpreadElement
    | Expression,
  path: NodePath<JSXAttribute | CallExpression>,
) {
  switch (node.type) {
    case "StringLiteral":
      node.value.split(/\s+/).forEach((cls) => this.classes.add(cls));
      break;
    case "CallExpression":
      node.arguments.forEach(async (ar) => {
        await handleExpression.call(this, ar, path);
      });
      // await resolveCallExpression.call(this, node.callee, path);
      break;
    case "ArrayExpression":
      node.elements.forEach(async (e) => {
        if (e) await handleExpression.call(this, e, path);
      });
      break;
    case "MemberExpression":
      //
      if (node.property.type === "Identifier") {
        this.classes.add(node.property.name);
      }
      break;
    case "ConditionalExpression":
      await handleExpression.call(this, node.consequent, path);
      await handleExpression.call(this, node.alternate, path);
      break;
    case "Identifier":
      const bindr = path.scope.getBinding(node.name);
      if (bindr && bindr.path.node.type === "VariableDeclarator") {
        const SG = this.StateValues.get(node.name);
        if (SG) {
          SG.forEach((value) =>
            value.split(/\s+/).forEach((cls) => this.classes.add(cls)),
          );
        }
        await resolveIdentifier.call(this, bindr.path.node, path as any);
      }
      break;
    default:
      break;
  }
}

async function resolveIdentifier(
  this: SweetShaker,
  node: VariableDeclarator,
  path: NodePath<JSXAttribute>,
) {
  switch (node.type) {
    case "VariableDeclarator":
      if (node.id.type === "Identifier") {
        const init = node.init;
        if (init && init.type === "CallExpression") {
          init.arguments.forEach(async (ar) => {
            await handleExpression.call(this, ar, path);
          });
        }
      }
      break;
    default:
      break;
  }
}

function getName(
  node:
    | VariableDeclarator["id"]
    | Expression
    | PrivateName
    | V8IntrinsicIdentifier,
) {
  switch (node.type) {
    case "Identifier":
      return node.name;
    case "ObjectPattern":
      return "";
    case "CallExpression":
      return getName(node.callee);
    case "MemberExpression":
      return getName(node.property);
    default:
      // $$.p = node.type;
      break;
  }
}

function getInit(node: any) {
  switch (node.type) {
    case "VariableDeclarator":
      return node.init;
    default:
      // $$.p = node.type;
      break;
  }
}
