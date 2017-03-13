import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class FanProfileService {
  public res: any = {error: null, data: {
    active: true,
    avatar: 'http://www.name-list.net/img/portrait/Denise_1.jpg',
    username: 'denise.fisher',
    firstName: 'Denise',
    lastName: 'Fisher',
    gender: '25',
    email: 'denise.fisher@denisefisher-site.com',
    role: 'user',
    type: 'fan',
    position: ['Singer', 'Song Writer'],
    location: {
      city: 'Pittsburg',
      country: 'USA',
      state: 'PA'
    },
    viewers: ['maxim.ugi', 'yuriy.betrozov', 'lyudmila.nesvitiy'],
    appreciations: ['yuriy.betrozov', 'lyudmila.nesvitiy'],
    followers: ['maxim.ugi', 'yuriy.betrozov', 'lyudmila.nesvitiy'],
    followings: ['maxim.ugi'],
    website: 'http://www.denisefisher-site.com',
    joinDate: new Date().toDateString(),
    biography: 'Denise Fisher, President & Founder Candy Entertainment. A native of Milwaukee, Wisconsin, Denises' +
    ' courage and zest for life began as a young girl, working summers at local entertainment companies but it was' +
    ' her innate connection to mankind that surfaced, as she began spreading her mantra and idea of people' +
    ' perpetually promoting positivism. This proved to be an indispensable tool in what would become Denises' +
    ' signature-entertaining anyone, anytime, anywhere. She used the channels of chorus, school plays, tackling' +
    ' every instrument imaginable, party planning, counseling, social networking, and most importantly, storytelling,' +
    ' as a tool to make smiles appear-this was her "platinum" ring. In fact, her anecdotes and ideologies contributed' +
    ' deeply in her quest to manage and help those in need, giving the talented individuals that continually cross' +
    ' Denises path, the impetus to motivate themselves, to pursue any vehicle necessary to accomplish their goals,' +
    ' and to showcase their innate abilities. As time moved forward, being in the "field" became Denises sponge and' +
    ' she soaked up as much as she could in all relevant areas, including Summerfest, "The Worlds Largest Music' +
    ' Festival", local radio and television stations, and even a brief stint as a costume/fashion designer, where' +
    ' she also aided a photographer. Here she mingled and met many "Hollywood" types, which further fueled her love' +
    ' for not only the entertainment industry, but her passion for people. Her college career initially took her to' +
    ' Ithaca College and University of Maryland College Park, where she participated in everything from drama, to' +
    ' writing articles for the college newspaper, to the Greek system, which sprouted a new found love for an' +
    ' illustrious and seemingly untouchable industry, yet she was desperate to explore it much further. In addition,' +
    ' this was also where her love for philanthropic work grew and she participated in and founded many' +
    ' organizations, including K.I.D.S. (Kicking Indecent Dependencies In Schools), Sing For Smiles, and others.' +
    ' Internships abounded and included, WJFK and WLUM Radio, The Task Force For Battered Women, G.A.M.M.A.,' +
    ' and MTV Networks.',
    contacts: {
      phone: '+19096586688',
      localChatName: 'denise.fisher'
    },
    shows: [{
      name: 'Shawn Mendes Show STAR!!!',
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
    {comment: 'Thank you so much, Bachtrack, for this feast of information to delight us again at the start of' +
    ' the New Year. Time is of no consequence when sifting through this incredible compilation.',
        stars: {video: 4, sound: 4, connect: 4, show: 4},
      firstName: 'Jim',
      lastName: 'Carrey',
      type: 'artist',
      avatar: '//pixel.nymag.com/imgs/daily/vulture/2016/10/12/12-jim-carrey.w529.h529.jpg'}],
    video: '',
    audio: '',
    photo: '',
    genres: ['Pop', 'Jazz', 'Blues', 'Alternative', 'Rock'],
    groupName: 'Denise Fisher'
  }};

  public getUser(): Observable<any> {
    return Observable.of(this.res);
  }
}
