/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { RepresentationModelObject } from '../models/representation-model-object';

@Injectable({
  providedIn: 'root',
})
export class RootService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation root
   */
  static readonly RootPath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `root()` instead.
   *
   * This method doesn't expect any request body.
   */
  root$Response(params?: {}): Observable<
    StrictHttpResponse<RepresentationModelObject>
  > {
    const rb = new RequestBuilder(this.rootUrl, RootService.RootPath, 'get');
    if (params) {
    }
    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/hal+json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<RepresentationModelObject>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `root$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  root(params?: {}): Observable<RepresentationModelObject> {
    return this.root$Response(params).pipe(
      map(
        (r: StrictHttpResponse<RepresentationModelObject>) =>
          r.body as RepresentationModelObject
      )
    );
  }
}
