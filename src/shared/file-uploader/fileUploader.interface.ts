export interface FileConfig {
  isMultiple: boolean,
  acceptTypes: string,
  labelText: string,
  name: string,
  error: {
    message: string;
    isShow: boolean;
  };
};
