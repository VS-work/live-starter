import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ArtistProfileService {
  public res = {error: null, data: {
    active: true,
    avatar: 'http://www.billboard.com/files/media/shawn-mendes-MSG-sept-2016-billboard-1548.jpg',
    username: 'shawn.mendes',
    firstName: 'Shawn',
    lastName: 'Mendes',
    gender: '29',
    email: 'shawn.mendes@mendes-site.com',
    role: 'user',
    type: 'artist',
    position: ['Singer', 'Song Writer'],
    location: {
      country: 'USA',
      state: 'PA',
      city: 'Pittsburg',
      address: 'Robust St. 17'
    },
    viewers: ['maxim.ugi', 'yuriy.betrozov', 'lyudmila.nesvitiy'],
    appreciations: ['yuriy.betrozov', 'lyudmila.nesvitiy'],
    followers: ['maxim.ugi', 'yuriy.betrozov', 'lyudmila.nesvitiy'],
    followings: ['maxim.ugi'],
    website: 'mendes-site.com',
    joinDate: new Date().toDateString(),
    biography: 'Shawn Peter Raul Mendes was born on August 8, 1998 in Toronto, Ontario, Canada, to Karen (Rayment),' +
    'a real estate agent, and Manuel Mendes, a businessman. His father is of Portuguese descent (from Lagos) and his' +
    'mother is English (with deep roots in Dorset). He has a sister, Aaliyah. Shawn was raised in Pickering. ' +
    'He first started posting cover videos on the social video app Vine in 2013 and picked up millions of followers' +
    ' in a matter of months, becoming well known for his six-second snippets of renditions of many popular songs.' +
    ' Andrew Gertler discovered Shawn online in January 2014, bringing him to Island Records where he eventually ' +
    'signed and released his first single "Life of the Party" in June 2014. He is the youngest artist to compose' +
    ' his own debut album in the top 25 with a debut song on the Billboard Hot 100, debuting at number 24 for the' +
    ' week   ending July 12, 2014 at 15 years of age.   Prior to his signing, Shawn toured as a member of the MagCon' +
    ' Tour (meet and greet convention) alongside other   young artists and social media sensations including Nash' +
    ' Grier, Aaron Carpenter, Cameron Dallas, Matthew Espinosa,   Taylor Caniff, Carter Reynolds, Sam Wilkinson,' +
    ' Dillan Rupp, Brent Rivera, Shawn Mendes, Hayes Grier,   Jacob Whitesides, Jack Johnson, Jack Gilinsky,' +
    ' Chris Collins and Mahogany Lox (their DJ).Shawn also was on   a nationwide tour with Austin Mahone and' +
    ' released his debut major label EP in July, with a debut album due out   later in 2014.He won the Teen Choice' +
    ' award in 2014 for Webstar in Music.',
    contacts: {
      phone: '+19096586688',
      localChatName: 'shawn.mendes',
      facebook: 'https://www.facebook.com/ShawnMendesOfficial/',
      twitter: 'https://twitter.com/ShawnMendes?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
      googleplus: 'https://plus.google.com/117511683220070404357',
      pinterest: 'https://www.pinterest.com/explore/shawn-mendes/',
      youtube: 'https://www.youtube.com/user/qzMendShawqz'
    },
    shows: [{
      name: 'Shawn Mendes Show',
      img: 'https://yt3.ggpht.com/-Fo3psUh2lKo/AAAAAAAAAAI/AAAAAAAAAAA/4_CHpyVokjo/s900-c-k-no-mo-rj-c0xffffff/' +
      'photo.jpg',
      date: new Date(),
      info: 'The rapid rise of Canadian singer-songwriter Shawn Mendes can be measured in a string of sold out' +
      ' shows around the world, masses of album and single certifications and streaming numbers. After releasing' +
      ' his debut album Handwritten (out now through Island Records), record sales in Australia and abroad are' +
      ' mind blowing.',
      price: 30, tickets: 63, funded: 83}],
    socials: {
      google: '',
      facebook: '',
      twitter: '',
      pinterest: '',
      youtube: ''
    },
    comments: [{comment: 'For me life is continuously being hungry. The meaning of life is not simply to exist,' +
    ' to survive, but to move ahead, to go up, to achieve, to conquer. The mind is the limit. As long as the mind' +
    ' can envision the fact that you can do something, you can do it, as long as you really believe 100 percent.',
      stars: {video: 4, sound: 4, connect: 4, show: 4},
      firstName: 'Arnold',
      lastName: 'Schwartznegger',
      type: 'artist',
      avatar: 'http://vegetarianskij.ru/wp-content/uploads/2013/10/arnold-shvarcenegger-vegetarianec.jpg'},
    {comment: 'Thank you so much, Bachtrack, for this feast of information to delight us again at the start of the' +
    ' New Year. Time is of no consequence when sifting through this incredible compilation.',
        stars: {video: 4, sound: 4, connect: 4, show: 4},
      firstName: 'Jim',
      lastName: 'Carrey',
      type: 'artist',
      avatar: '//pixel.nymag.com/imgs/daily/vulture/2016/10/12/12-jim-carrey.w529.h529.jpg'}],
    video: '',
    audio: 'music',
    photo: '',
    genres: ['Pop', 'Jazz', 'Blues', 'Alternative', 'Rock'],
    groupName: 'Shawn Mendes',
    tips: [{
      avatar: 'https://s-media-cache-ak0.pinimg.com/originals/2f/1c/ee/2f1cee39bfc1d4588ce3c55ae1e90030.png',
      username: 'denise.fisher',
      firstName: 'Denise',
      lastName: 'Fisher',
      type: 'fan',
      location: 'Japan',
      tipTarget: 'show'
    }, {
      avatar: 'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/facebook_og_image/public/story/' +
      'jessica-alba-tan-329-1.jpg?itok=YVCx522O',
      username: 'sam.barum',
      firstName: 'Sam',
      lastName: 'Barum',
      type: 'fan',
      location: 'United Kingdom',
      tipTarget: 'show'
    }, {
      avatar: 'https://pixel.nymag.com/imgs/daily/vulture/2016/10/12/12-jim-carrey.w529.h529.jpg',
      username: 'jim.carrey',
      firstName: 'Jim',
      lastName: 'Carrey',
      type: 'artist',
      location: 'USA',
      tipTarget: 'general'
    }, {
      avatar: 'http://img5.zergnet.com/1421690_300.jpg',
      username: 'wookie.monster',
      firstName: 'Wookie',
      lastName: 'Monster',
      type: 'artist',
      location: 'Poland',
      tipTarget: 'general'
    }, {
      avatar: 'http://vegetarianskij.ru/wp-content/uploads/2013/10/arnold-shvarcenegger-vegetarianec.jpg',
      username: 'arnold.shwartznegger',
      firstName: 'Arnold',
      lastName: 'Schwartznegger',
      type: 'artist',
      location: 'USA',
      tipTarget: 'other'
    }, {
      avatar: 'https://cdn.quotesgram.com/img/80/80/814475983-Patricia_Kaas_Quotes-2.jpg',
      username: 'patricia.kaas',
      firstName: 'Patricia',
      lastName: 'Kaas',
      type: 'artist',
      location: 'France',
      tipTarget: 'other'
    }]
  }};

  public getUser(): Observable<any> {
    return Observable.of(this.res);
  }
}
