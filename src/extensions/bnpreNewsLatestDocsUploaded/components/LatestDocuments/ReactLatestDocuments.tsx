import * as React from 'react';
import { IReactLatestDocumentsProps } from "./IReactLatestDocumentsProps";
import { IReactLatestDocumentsState } from "./IReactLatestDocumentsState";
 import StackStyle from './StackStyle';
import spservices from "../../service/SpService";

export default class ReactLatestDocuments extends React.Component<IReactLatestDocumentsProps, IReactLatestDocumentsState>{

  private _spservices: spservices;

  constructor(props: IReactLatestDocumentsProps, state: IReactLatestDocumentsState) {
    super(props);

    this.state = {
      SPGuid: '',
      News: [],
      Reload: false
    }
    this._spservices = new spservices(this.props.context);
  }

  public componentDidMount() {
    console.error("ReactLatestDocuments :componentDidMount ");
        this.Get('Default');
  }

  public componentDidUpdate(prevProps: IReactLatestDocumentsProps) {
    if (prevProps.Site !== this.props.Site) {

      if (this.props.Site.length > 0) {
        this.Get('Update');
      }
      else {
        this.Get('Default');
      }

      this.setState({ Reload: !this.state.Reload });
    }
  }


  public async Get(Choice) {
    var e: any[] = [];
    var URL: any;
    if (this.props.Site === undefined || this.props.Site.length < 1 || (Choice === 'Default' && this.props.Site.length < 1)) {
      URL = "http://pars402i2701.bnppi.priv/sites/DocsDSI"
      //URL = "https://sharepoint-uat-realestate.staging.echonet/sites/DocsDSI"
     
      const Posts = await this._spservices.getLatestDocuments(URL);

      Posts.map(async Post => {
        //  const Url = await this._spservices.getPathDocument(URL, Post.Id)

        // const Likes = await this._spservices.getLikes(URL, Post.Id);
          // console.info(Post.Id + " URL: " + Url);
        e.push({
          // Author: Post.Author,
          Title: Post.Title,
          // Description: Post.Description,
          Id: Post.Id,
          Created: Post.Created,
          Modified: Post.Modified,
          // Thumbnail: Post.BannerImageUrl,
          // Url: Post.Url
           Url :Post.Url2,
          // Comments: Comments,
          // Likes: Likes
        });
        if (this.state.Reload === true) {
          this.setState({ News: e, Reload: false });
        }
        else {
          this.setState({ News: e });
        }
      });
    }
    else {
      this.props.Site.map(async site => {
        URL = site.url;
        const Info = await this._spservices.getLatestDocuments(URL);
        Info.map(async Post => {
          //  const ServerRelativeUrl = await this._spservices.getPathDocument(site.url, Post.Id);
          // const Likes = await this._spservices.getLikes(site.url, Post.Id);
          e.push({
            Author: Post.Author,
            Title: Post.Title,
            Description: Post.Description,
            Id: Post.Id,
            Created: Post.Created,
            Thumbnail: Post.BannerImageUrl,
            Url: Post.Url,
            // ServerRelativeUrl: ServerRelativeUrl,
            // Likes: Likes
          });
          if (this.state.Reload === true) {
            this.setState({ News: e, Reload: false });
          }
          else { this.setState({ News: e }); }
        });
      });
    }
    this.setState({ News: e });
  }

  public render(): React.ReactElement<IReactLatestDocumentsProps> {
    return (
      <div style={{ height: '100%', width: '100%' }}>
               {<StackStyle News={this.state.News} AuthorToggle={this.props.AuthorToggle}></StackStyle>}
      </div>)
  }
}