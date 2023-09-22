// to remove ts errors from logo image imports
declare module "*.png" {
    const value: string;
    export = value;
}
