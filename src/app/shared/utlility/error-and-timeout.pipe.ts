import { catchError, of, pipe, throwError, timeout } from 'rxjs';

export function ErrorAndTimeoutPipe(
  apiTimeout: number,
  apiCallName: string,
  defaultReturnValue: any
) {
  return pipe(
    timeout({
      first: apiTimeout, // Times out only first value emitted from observable.
      with: () => throwError(() => new Error('API has timed out')), // Throws timeout error.
    }),
    catchError((error) => {
      // Handles all erros including timeout.
      console.error(`${apiCallName} call returned error`, error);
      return of(defaultReturnValue);
    })
  );
}
