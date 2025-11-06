import { HttpErrorResponse } from "@angular/common/http";

export interface FeatureErrorHandler {
  match: (url: string) => boolean;
  map: (error: HttpErrorResponse) => string | null;
}