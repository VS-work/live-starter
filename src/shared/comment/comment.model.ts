import { ArtistType, FanType } from '../../enums/user-types.enum';

import { parseDateAccordingToTimeZone } from '../../assets/functions/parse-date-according-totime-zone';

export class Comment {
  commentator: {
    avatar: string;
    username: string;
    type: string;
    _id: string;
  };
  comment: string;
  dateCreated: string;
  _id: string;

  constructor(data: Comment) {
    this.commentator = {
      avatar: data.commentator.avatar,
      username: data.commentator.username,
      type: data.commentator.type === FanType.type ? FanType.title : ArtistType.title,
      _id: data.commentator._id
    };
    this.dateCreated = parseDateAccordingToTimeZone({
      date: new Date(data.dateCreated),
      dateFormat: 'dddd, MMMM DD YYYY, h:mm:ss a'
    });
    this.comment = data.comment;
    this._id = data._id;
  }

}
