oeApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'HOME': 'Home',
    'PORTALS': 'Portals',
    'SELECT_EN': 'English websites',
    'SELECT_FR': 'French websites',
    'MOVE_BLOCS': 'Move blocs',
    'ABOUT': 'ABOUT',
    'BY': 'by',
    'VIEWERS': 'viewers',
    'WITH': 'with',
    'INFO_TITLE': 'eSport news',
    'INFO_DESCRIPTION': 'Open eSport is a news websites. All the articles come from the main websites available and also from Reddit threads.\n\nYou can find articles and popular streams on each game\'s page.',
    'ANDROID_DESCRIPTION': 'Open eSport is also available on Android. You can find it in the ',
    'THANKS': 'Thanks',
    'THANKS_DESCRIPTION': 'Thanks to Stephane \'deKey\' Sanchez for the logo and to Edouard \'xiN\' Forgeau for his feedbacks.\n\nOpen eSport is a part of Nodejitsu Open Source program.',
  	'CONTACT_DESCRIPTION': 'You can find all the latest updates with the twitter account: ',
  	'CONTACT_DESCRIPTION2': 'Contact Open eSport by email at antoine[at]riviere[dot]tf.',
    'NO_ARTICLE': 'No article.',
    'MORE': 'More',
    'FILTER': 'Filters',
    'ARTICLES_TITLE': 'All The News',
    'STREAMS': 'Streams'
  });
 
  $translateProvider.translations('fr', {
    'HOME': 'Accueil',
    'PORTALS': 'Portails',
    'SELECT_EN': 'Sites anglais',
    'SELECT_FR': 'Sites français',
    'MOVE_BLOCS': 'Déplacer les blocs',
    'ABOUT': 'À PROPOS',
    'BY': 'par',
    'VIEWERS': 'spectateurs',
    'WITH': 'avec',
    'INFO_TITLE': 'Portail eSport',
    'INFO_DESCRIPTION': 'Open eSport est un portail d\'actualités eSport. Les articles proviennent des principales rédactions francophones et anglophones ainsi que des fils de discussions Reddit.\n\nChaque jeu dispose aussi de son propre portail rassemblant ses articles et ses streams.',
    'ANDROID_DESCRIPTION': 'Open eSport est aussi disponible sur Android. Vous pouvez trouver l\'application sur le ',
    'THANKS': 'Remerciements',
    'THANKS_DESCRIPTION': 'Merci à Stephane \'deKey\' Sanchez pour le logo et à Edouard \'xiN\' Forgeau pour ses retours.\n\nOpen eSport fait partie du programme open source de nodejitsu.',
  	'CONTACT_DESCRIPTION': 'Retrouvez les dernières mises à jour du site sur twitter : ',
  	'CONTACT_DESCRIPTION2': 'Contactez Open eSport par mail à antoine[arobase]riviere[point]tf.',
  	'NO_ARTICLE': 'Aucun article disponible.',
    'MORE': 'Plus',
    'FILTER': 'Filtres',
    'ARTICLES_TITLE': 'Toute l\'Actualité',
    'STREAMS': 'Streams'
  });
 
  $translateProvider.preferredLanguage('en');
}]);