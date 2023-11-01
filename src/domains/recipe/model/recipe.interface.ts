export interface IRecipe {
  title?: string;
  content?: string;
  image?: string;
}

export interface IRecipeUpdate {
  recipeId: string;
  recipeData: IRecipe;
  credential: CredentialUser;
}

interface IFindOneQuery {
  recipeId?: string;
}

export interface IFindOne {
  query: IFindOneQuery;
  checkExistence?: {
    flag: boolean;
    errorMsg?: string;
  };
  credential: CredentialUser;
}
