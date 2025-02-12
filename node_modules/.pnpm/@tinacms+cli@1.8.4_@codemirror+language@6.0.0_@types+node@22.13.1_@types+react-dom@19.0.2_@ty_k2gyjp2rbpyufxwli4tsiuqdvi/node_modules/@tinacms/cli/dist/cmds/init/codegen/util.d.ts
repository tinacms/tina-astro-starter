import ts from 'typescript';
export declare const makeTransformer: <T extends ts.Node>(makeVisitor: (ctx: ts.TransformationContext) => ts.Visitor) => ts.TransformerFactory<T>;
export declare function parseExpression(expression: string): [ts.SourceFile, ts.Expression];
export declare function parseVariableStatement(stmt: string): [ts.SourceFile, ts.VariableStatement];
