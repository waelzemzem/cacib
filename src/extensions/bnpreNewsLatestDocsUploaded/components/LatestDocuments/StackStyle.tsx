import * as React from "react";
import { StylingState, StylingProps } from "./StylingPropsState";
// import { Icon } from "office-ui-fabric-react/lib/Icon";
// import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
// import styles from "./ReactLatestDocuments.module.scss";
import * as strings from 'BnpreNewsLatestDocsUploadedApplicationCustomizerStrings';
import * as $ from 'jquery';
require('./../../css/ticker.css');
require('ticker');

export default class StackStyle extends React.Component<
  StylingProps,
  StylingState
> {
  constructor(props: StylingProps) {
    super(props);
    this.state = {
      News: [],
      RenderedNews: [],
    };
  }

  public componentDidMount() {


  }
  public render(): React.ReactElement<StylingProps> {
    var i = 0;
    // JQuery
    $(document).ready(function () {
      $('.ticker-container ul div').each(function (i) {
        if ($(window).width() >= 500) {
          $(this).find('li').width($(window).width() - parseInt($(this).css('left')));
        }
        if (i == 0) {
          $(this).addClass('ticker-active');
        } else {
          // console.dir( ($(this).find('li')) + ": "+ $(this).attr('class'));
          $(this).addClass('not-active');
        }
        if ($(this).find('li').height() > 30) {
          $(this).find('li').css({
            'height': '20px',
            'width': '200%',
            'text-align': 'left',
            'padding-left': '5px'
          });
          $(this).find('li').css('width', $(this).find('li span').width());
        }
      });
    });

    return (
      <div className="ticker-container">
        <div className="ticker-caption">
          <p> {strings.TickerTitleText}</p>
        </div>
        <ul>
          {this.props.News.map((Post) => {
            // i = i + 1;
            return (
              <div>
                <li> {i}
                  id : {Post.Id} - <a href={Post.Url}>{Post.Title} </a> &ndash;
                  &laquo; <span >{strings.CreatedText} {Post.Created}</span><span>{strings.AuthorText} </span> &raquo;
                  &laquo; <span >{strings.ModifiedText} {Post.Modified}</span><span>{strings.EditorText} </span> &raquo;

                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}