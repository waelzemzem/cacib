import { Item, sp, Web } from "@pnp/sp";
import { Documents } from "../models/Documents"
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as $ from 'jquery';
import Constants from "../helpers/Constants";

export default class spservices {
  constructor(private context: PlaceholderContent) {
    sp.setup({
      spfxContext: this.context
    });
    this.onInit();

  }
  private async onInit() {
  }

  public async getLatestDocuments(webUrl?: string): Promise<any[]> {
    try {

      let siteWeb = new Web(webUrl);
      let listName = "Procédures";

      //   let ItemsByQuery: any = await siteWeb.getList("/sites/DocsDSI/AppProceduresDocsLibrary").getItemsByCAMLQuery({
      //     ViewXml: `<View><Query>

      //             </Query></View>`,
      // });



      let Items: any = await siteWeb.getList("/sites/DocsDSI/AppProceduresDocsLibrary").items.get;
      console.dir(Items);

      //files.expand('ListItemAllFields', 'Author').get();
      // .rootFolder.files
      // .select('*,listItemAllFields')
      //.get();


      // // console.log(await siteWeb.lists.getByTitle("Site%20Pages").defaultView);
      // let Items: any = await siteWeb.lists. getByTitle("Procédures").items //.fields
      //  // .select("Modified")
      //   //   // .expand("Author/ID")
      //   //   // .orderBy("Modified", true)
      //   .get();
      //   // .then(console.dir);



      //   let ItemsByView: any = await siteWeb.lists.getByTitle("Procédures").views.getByTitle("Tous les documents").get().then(v => {

      //     let ServerRelativeUrl: any =  siteWeb.lists.getByTitle("Procédures").items.getById(v.ID).file.get();
      //     console.dir('ServerRelativeUrl : ' + ServerRelativeUrl);
      //     console.dir('La vue est : ' + v.ViewQuery);
      // });



      //  sp.web.lists.getByTitle("Procédures").select("Title", "ID").items.get()
      //  .then((items: any[]) => (console.dir));



      // // const r = await Items.select("Id")();
      // items2.forEach(item => {
      //     console.log(item);
      //    });

      //  Items.forEach(item => {
      //   console.log(item.InternalName);
      //  });
      // console.info(r.Id);


      // even if in most of the cases they equal
      // // const list = await siteWeb.lists.getByTitle('Procédures');
      // // const fields =  list.fields.select("Title").get().then((res) => {
      // //         console.log(res);
      // //  });


      var Res = [];

      // // // await Promise.all(Items.map(async (file) => {
      // // //   const contents = await this.getPathDocument(webUrl, file.Id);
      // // //   console.dir(contents)
      // // // }));

      Items.map(item => {

        //   var Url = webUrl.split('/sites/')[0] + item.FileRef;
        var CreatedDate = (item.Created).split('T')[0];
        var ModifiedDate = (item.Modified).split('T')[0];

        // console.error( item.ServerRedirectedEmbedUri);
        // console.dir("Url " + Url);
        // // console.dir("item.Author.Title " + item.Author);
        // console.dir("item.Title " + item.Title);
        // // console.dir("item.Description " + item.Description);
        // console.dir("Id " + item.Id);
        // console.dir("Date " + Date);
        // // console.dir("item.BannerImageUrl.Url " + item.BannerImageUrl.Url);
        if (item.ContentTypeId.startsWith(Constants.CONTENT_TYPE_ID)) {
          const Url = this.getPathDocument(webUrl, item.Id);
          Res.push({
            // Author: item. Author.Title,
            Title: item.Title,
            // Description: item.Description,
            Id: item.Id,
            Created: CreatedDate,
            Modified: ModifiedDate,
            // BannerImageUrl: item.BannerImageUrl.Url
            //  Url: Url.ServerRelativeUrl
            Url: item.ServerRedirectedEmbedUri,
            Url2: Url,
          });
        }
      });

      return Res;
    }
    catch (error) {
      console.error("ERROR getLatestDocuments : " + error);
      return Promise.reject(error)
    }
  }

  public async getPathDocument(webUrl, ID) {
    try {

      let siteWeb = new Web(webUrl);
      //  let siteWeb = new Web(webUrl);
      let itemByIdXml: any = await siteWeb.getList("/sites/DocsDSI/AppProceduresDocsLibrary").items.getById(ID).get();
      console.dir(itemByIdXml);
      return itemByIdXml.ServerRelativeUrl;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  public async getLikes(webUrl, ID): Promise<any> {
    try {
      let siteWeb = new Web(webUrl);
      // let siteWeb = new Web(Site);
      let Likes: any = await siteWeb.lists.getByTitle("Site%20Pages").items.getById(ID).getLikedByInformation();
      return Likes.likeCount;
    }

    catch (error) {
      return Promise.reject(error);
    }
  }

  public async getLatestDocumentsByLibraryInternalName(listTitle: string, listViewTitle: string): Promise<Documents[]> {

    //  // Get xml schema for the "Published News" view
    //  const list = sp.web.lists.getByTitle(listTitle);
    //  const view = await list.views.getByTitle(listViewTitle)();
    //  if (!view) return [];

    //  const items = await list.getItemsByCAMLQuery({ViewXml: view.ListViewXml});
    //  return items.map(item => (<Documents>{
    //   ID: item['Title'],
    //   FileLeafRef: item['Title'],
    //   Created:new Date(item['Title']),
    //   Author: item['Title'],
    //   Modified:  new Date(item['Title']),
    //   Editor: item['Title'],
    //   FileRef: item['Title'],
    //   ProjectName: item['Title'],
    //   LibraryName: item['Title'],
    //   ParentFolder: item['Title'],
    //   IconUrl: item['Title']

    //  }));
    return null;

  }

}