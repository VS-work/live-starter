export interface HowItWorksInfo {
  notes: [
    {
      title: string,
      description: string,
      img: string
    }
  ],
  benefits: {
    title: string;
    list: [
      {
        title: string,
        desciption: string,
        icon: string
      }
    ]
  }
}

export const FOR_ARTISTS: HowItWorksInfo = {
  notes: [
    {
      title: 'EXPLORE',
      description: 'Search the most active fans you would like to play for.',
      img: 'http://theglorious.com/wp-content/uploads/2014/04/BD-in-SF-FB-01-350x350.jpg'
    },
    {
      title: 'CREATE',
      description: 'If there is not a scheduled event for the artist, click and create one.',
      img: 'http://latinoxradio.com/wp-content/uploads/2016/04/mobile-phone-iphone-music-38295-760x760.jpeg'
    },
    {
      title: 'SHARE',
      description: 'Spread the world to your friends.',
      img: 'http://hulafrogportal.com/sugar/hulafrogphoto/gky_uploads/2014/11/230-x-230px-9-14-hands-making-heart-at-concert.jpg'
    },
    {
      title: 'WATCH',
      description: 'Offer the live streamed event by the selected fans.',
      img: 'https://images.pexels.com/photos/281451/pexels-photo-281451.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    }
  ],
  benefits: {
    title: 'Benefits for artists',
    list: [
      {
        title: 'Minimize your financial risk',
        desciption: 'Takes the risk out booking live venues in far-off places and eliminates logistical touring nightmares.',
        icon: '/assets/img/minimize-your-financial-risk1-copy.png'
      },
      {
        title: 'Perform from around the World',
        desciption: 'Intimate live stream performances with true fans from all around the world at the all at the same moment.',
        icon: '/assets/img/perform-for-your-fans-from-around-the-world.png'
      },
      {
        title: 'Engage with your fans more often',
        desciption: 'Interact with your fans LIVE at anytime and from anywhere.',
        icon: '/assets/img/engage-with-your-fans-more-often.png'
      }, {
        title: 'Build your fanbase more easily',
        desciption: 'Passionate fans will get the world out to others when you make yourself more available via live stream performance.',
        icon: '/assets/img/build-your-fanbase-more-easily.png'
      }
    ]
  }
};


export const FOR_FANS: HowItWorksInfo = {
  notes: [
    {
      title: 'EXPLORE',
      description: 'Search the artist you would like to see in a live stream event.',
      img: 'http://theglorious.com/wp-content/uploads/2014/04/BD-in-SF-FB-01-350x350.jpg'
    },
    {
      title: 'CREATE',
      description: 'If there is not a scheduled event for the artist, click and create one.',
      img: 'http://latinoxradio.com/wp-content/uploads/2016/04/mobile-phone-iphone-music-38295-760x760.jpeg'
    },
    {
      title: 'SHARE',
      description: 'Spread the world to your friends.',
      img: 'http://hulafrogportal.com/sugar/hulafrogphoto/gky_uploads/2014/11/230-x-230px-9-14-hands-making-heart-at-concert.jpg'
    },
    {
      title: 'WATCH',
      description: 'Enjoy the live streamed event by the selected artist.',
      img: 'https://images.pexels.com/photos/281451/pexels-photo-281451.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    }
  ],
  benefits: {
    title: 'Benefits for fans',
    list: [
      {
        title: 'Front row seat',
        desciption: 'Every fan experiences a front row seat to an intimate backstage-like experience.',
        icon: '/assets/img/front-row-seat.png'
      },
      {
        title: 'Satisfaction guaranteed',
        desciption: 'If the live stream events does not happen for some reason we will provide a full refund.',
        icon: '/assets/img/satisfaction-guaranteed.png'
      },
      {
        title: 'Fans demand',
        desciption: 'Take charge and bring the artist you want to perform in an up-close live stream event.',
        icon: '/assets/img/fans-demand.png'
      }, {
        title: 'Chat with artists',
        desciption: 'Because every performance at on LiveStarter is LIVE, you\'ll be abble to chat with artists directly.',
        icon: '/assets/img/chat-with-artists.png'
      }
    ]
  }
};
