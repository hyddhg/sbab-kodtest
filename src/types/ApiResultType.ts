type ApiResultType<ResultType> = {
  StatusCode: number;
  Message: string | null;
  ExecutionTime: number;
  ResponseData: {
    Version: string;
    Type: string;
    Result: ResultType[];
  };
};

export default ApiResultType;
