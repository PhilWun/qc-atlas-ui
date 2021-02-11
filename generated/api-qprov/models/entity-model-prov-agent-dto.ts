/* tslint:disable */
import { Attribute } from './attribute';
import { LangString } from './lang-string';
import { Links } from './links';
import { Location } from './location';
import { Other } from './other';
import { QualifiedName } from './qualified-name';
import { Type } from './type';
export type EntityModelProvAgentDto = {
  id?: QualifiedName;
  label?: Array<LangString>;
  location?: Array<Location>;
  type?: Array<Type>;
  attributes?: Array<Attribute>;
  others?: Array<Other>;
  _links?: Links;
};
