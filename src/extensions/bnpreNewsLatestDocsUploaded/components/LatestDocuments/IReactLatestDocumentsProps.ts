
import { BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName } from '@microsoft/sp-application-base';
//import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";

export interface IReactLatestDocumentsProps {
  StyleToggle: string;
  AuthorToggle: string;
  context: PlaceholderContent;
  Site: any[];
  listTitle: string;
  listViewTitle: string;
}