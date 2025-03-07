// mock data на случай, если htmlacademy перекроет доступ.

const userData = {
  'userName': 'Максим',
  'balances': [
    {
      'currency': 'RUB',
      'amount': 5297989
    },
    {
      'currency': 'KEKS',
      'amount': 58.25
    }
  ],
  'wallet': {
    'currency': 'KEKS',
    'address': '6261y2xdgkrwb41fbyt738qjmvrogp5ihv3l9lvj'
  },
  'paymentMethods': [
    {
      'currency': 'RUB',
      'provider': 'QIWI',
      'accountNumber': '0000 0000 0000 2121'
    },
    {
      'currency': 'RUB',
      'provider': 'Tinkoff',
      'accountNumber': '0000 0000 0000 8442'
    },
    {
      'currency': 'RUB',
      'provider': 'Cash in person'
    }
  ]
};

const contractorsData = [
  {
    'id': 'B3E7GS8nMMRESYJsiYi5g',
    'balance': {
      'currency': 'RUB',
      'amount': 4645063
    },
    'exchangeRate': 3364.57,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Григорий',
    'wallet': {
      'currency': 'KEKS',
      'address': 'srxyhupeh8pwm76sgr5s3ck9phkalr220z675khk'
    },
    'minAmount': 5840
  },
  {
    'id': 'ZK4sLWOBsp_Ew4UqNxJ49',
    'balance': {
      'currency': 'RUB',
      'amount': 4713575
    },
    'exchangeRate': 3496.97,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Владимир',
    'wallet': {
      'currency': 'KEKS',
      'address': 'nvpj3edxrcbrhyuc8jnoj4sgf945kzyrcdsbngp7'
    },
    'minAmount': 30985
  },
  {
    'id': 'VrSS-PdTRrj8nFCLon_aO',
    'balance': {
      'currency': 'KEKS',
      'amount': 94.08
    },
    'exchangeRate': 5780.17,
    'isVerified': true,
    'status': 'seller',
    'userName': 'Борис',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 7916'
      },
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.86811,
      'lng': 29.99706
    },
    'minAmount': 4
  },
  {
    'id': 'Ixpm8YVyS_wNwwtxXi9zB',
    'balance': {
      'currency': 'KEKS',
      'amount': 93.07
    },
    'exchangeRate': 6078.06,
    'isVerified': true,
    'status': 'seller',
    'userName': 'Илья',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'QIWI',
        'accountNumber': '0000 0000 0000 3174'
      },
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.82855,
      'lng': 29.88482
    },
    'minAmount': 6
  },
  {
    'id': 'CY3eYMWRfO3Me0ZEZfcKX',
    'balance': {
      'currency': 'RUB',
      'amount': 3120437
    },
    'exchangeRate': 1709.49,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Сергей',
    'wallet': {
      'currency': 'KEKS',
      'address': 'ebi0q9ks8k8lhrd5ydcziqz3tid4ru6um137v7gg'
    },
    'minAmount': 9887
  },
  {
    'id': 'D5UfF5Oh9Pb0yuq7xF2i-',
    'balance': {
      'currency': 'RUB',
      'amount': 6019659
    },
    'exchangeRate': 8165.94,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Сергей',
    'wallet': {
      'currency': 'KEKS',
      'address': '3k8o40tomrhrln15667efpp1kaq7qddwqxk1ryjj'
    },
    'minAmount': 8899
  },
  {
    'id': '7EMmkRKDzWjjPL8CqWE69',
    'balance': {
      'currency': 'KEKS',
      'amount': 0.12
    },
    'exchangeRate': 8454.3,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Прохор',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Tinkoff',
        'accountNumber': '0000 0000 0000 7247'
      },
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.84739,
      'lng': 29.84735
    },
    'minAmount': 0
  },
  {
    'id': 'zjSlJKloQH7MY1iqwliiK',
    'balance': {
      'currency': 'RUB',
      'amount': 3501255
    },
    'exchangeRate': 1831.02,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Максим',
    'wallet': {
      'currency': 'KEKS',
      'address': '27e1bt8mw3c0idxargfyni502l870yf6vmg4yjne'
    },
    'minAmount': 7698
  },
  {
    'id': 'p1nIbXXbXPfpOJSuZ4849',
    'balance': {
      'currency': 'RUB',
      'amount': 711209
    },
    'exchangeRate': 4436.2,
    'isVerified': true,
    'status': 'buyer',
    'userName': 'Борис',
    'wallet': {
      'currency': 'KEKS',
      'address': 'nonbnmcxuxsh2t1xh5ppd8ylc1dat169patcewdq'
    },
    'minAmount': 1493
  },
  {
    'id': 'kTu_eH1LWPeYUmi1gftUj',
    'balance': {
      'currency': 'KEKS',
      'amount': 5.28
    },
    'exchangeRate': 5114.45,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Григорий',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.74588,
      'lng': 30.08588
    },
    'minAmount': 0
  },
  {
    'id': 'DcXLtPsKmmPRMjQIjIBIc',
    'balance': {
      'currency': 'RUB',
      'amount': 1669386
    },
    'exchangeRate': 4415.97,
    'isVerified': true,
    'status': 'buyer',
    'userName': 'Анастасия',
    'wallet': {
      'currency': 'KEKS',
      'address': 'kor7q2idl6dtbt16mre5sk8tzwz3mmcgef6h58ab'
    },
    'minAmount': 10764
  },
  {
    'id': 'Ms5ouIOee3ndydwAKDNSo',
    'balance': {
      'currency': 'KEKS',
      'amount': 68.64
    },
    'exchangeRate': 4118.06,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Кирилл',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 7473'
      },
      {
        'currency': 'RUB',
        'provider': 'Tinkoff',
        'accountNumber': '0000 0000 0000 1388'
      },
      {
        'currency': 'RUB',
        'provider': 'QIWI',
        'accountNumber': '0000 0000 0000 9501'
      }
    ],
    'minAmount': 1
  },
  {
    'id': 'jq_vjp43wnbtVQR27Fw3l',
    'balance': {
      'currency': 'KEKS',
      'amount': 53.18
    },
    'exchangeRate': 2152.76,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Кирилл',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      },
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 6611'
      }
    ],
    'coords': {
      'lat': 59.60195,
      'lng': 29.56839
    },
    'minAmount': 0
  },
  {
    'id': 'repMhZb6oLHTbnzphzkyJ',
    'balance': {
      'currency': 'RUB',
      'amount': 4495637
    },
    'exchangeRate': 3606.09,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Борис',
    'wallet': {
      'currency': 'KEKS',
      'address': 'rnmrzqopihc2d4tl9pn8cw8f843tl04fgoti1trp'
    },
    'minAmount': 22733
  },
  {
    'id': 'Ut5AuRLkHyGvfrP215PMJ',
    'balance': {
      'currency': 'KEKS',
      'amount': 46.41
    },
    'exchangeRate': 8011.63,
    'isVerified': true,
    'status': 'seller',
    'userName': 'Антон',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.71536,
      'lng': 30.16621
    },
    'minAmount': 0
  },
  {
    'id': 'aP6BLFjT2XmgILK-L66RU',
    'balance': {
      'currency': 'RUB',
      'amount': 8928584
    },
    'exchangeRate': 916.29,
    'isVerified': true,
    'status': 'buyer',
    'userName': 'Владимир',
    'wallet': {
      'currency': 'KEKS',
      'address': 'l0kvamz2g1hmac801jug5peyd4f2prbs8vs3szlj'
    },
    'minAmount': 80239
  },
  {
    'id': '6Te0f3DUYlxqsz4r4kSSc',
    'balance': {
      'currency': 'KEKS',
      'amount': 36.6
    },
    'exchangeRate': 2864.93,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Борис',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.80325,
      'lng': 29.82011
    },
    'minAmount': 1
  },
  {
    'id': 'xXssmHGLbZO484UGmZ4gz',
    'balance': {
      'currency': 'RUB',
      'amount': 2083226
    },
    'exchangeRate': 3316.99,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Владимир',
    'wallet': {
      'currency': 'KEKS',
      'address': 'si0m1sf8kiseuibs3mebplbyjf4gtemif90bws42'
    },
    'minAmount': 11235
  },
  {
    'id': 'NxLejyF3Fgdb8-Pgtfp_I',
    'balance': {
      'currency': 'KEKS',
      'amount': 33.51
    },
    'exchangeRate': 4368.85,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Елена',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Tinkoff',
        'accountNumber': '0000 0000 0000 3279'
      },
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 1529'
      }
    ],
    'minAmount': 0
  },
  {
    'id': 'I86zw-TrgamQUKuE6EHpc',
    'balance': {
      'currency': 'KEKS',
      'amount': 79.88
    },
    'exchangeRate': 624.3,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Людмила',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 2754'
      },
      {
        'currency': 'RUB',
        'provider': 'Cash in person'
      }
    ],
    'coords': {
      'lat': 59.71618,
      'lng': 29.48847
    },
    'minAmount': 0
  },
  {
    'id': '67efvbj4x-LX2kfPLTWXY',
    'balance': {
      'currency': 'KEKS',
      'amount': 20.14
    },
    'exchangeRate': 6317.43,
    'isVerified': true,
    'status': 'seller',
    'userName': 'Антон',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 8458'
      },
      {
        'currency': 'RUB',
        'provider': 'QIWI',
        'accountNumber': '0000 0000 0000 2375'
      }
    ],
    'minAmount': 0
  },
  {
    'id': 'bHWv9Rbm_qeUhsiQ2L_97',
    'balance': {
      'currency': 'RUB',
      'amount': 8450653
    },
    'exchangeRate': 6747,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Зинаида',
    'wallet': {
      'currency': 'KEKS',
      'address': 'nylxcj2spaiff9wj6augftn5swzgwwhutu15kd28'
    },
    'minAmount': 33777
  },
  {
    'id': '-IppE7wnZ9mh1BFUeA9B7',
    'balance': {
      'currency': 'KEKS',
      'amount': 64.19
    },
    'exchangeRate': 8470.15,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Елена',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'QIWI',
        'accountNumber': '0000 0000 0000 7794'
      },
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 1185'
      }
    ],
    'minAmount': 2
  },
  {
    'id': 'c5Xj1aoe6kgyTkzgXHVpj',
    'balance': {
      'currency': 'RUB',
      'amount': 4685744
    },
    'exchangeRate': 6461.61,
    'isVerified': true,
    'status': 'buyer',
    'userName': 'Антон',
    'wallet': {
      'currency': 'KEKS',
      'address': '9u3a1zo94qf0g1r0lated1ea2s233je11wv7edtp'
    },
    'minAmount': 28102
  },
  {
    'id': 'wil23rnFISry1Lo2fnShl',
    'balance': {
      'currency': 'KEKS',
      'amount': 21.5
    },
    'exchangeRate': 8144.77,
    'isVerified': true,
    'status': 'seller',
    'userName': 'Алексей',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Tinkoff',
        'accountNumber': '0000 0000 0000 8290'
      },
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 5780'
      }
    ],
    'minAmount': 1
  },
  {
    'id': 'NjB8nUh6Gr6mVNpHkGWzZ',
    'balance': {
      'currency': 'KEKS',
      'amount': 8.73
    },
    'exchangeRate': 271.97,
    'isVerified': true,
    'status': 'seller',
    'userName': 'Алексей',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 1482'
      }
    ],
    'minAmount': 0
  },
  {
    'id': 'GhiXxuJvew602K7lEhe7n',
    'balance': {
      'currency': 'RUB',
      'amount': 5112040
    },
    'exchangeRate': 7061.66,
    'isVerified': false,
    'status': 'buyer',
    'userName': 'Владимир',
    'wallet': {
      'currency': 'KEKS',
      'address': 'qt9akcq701s3e5mmorsp0cpv8b7xgs5ys5uxambe'
    },
    'minAmount': 11457
  },
  {
    'id': 't9QZcaQeJQv2mNkLTZ78o',
    'balance': {
      'currency': 'KEKS',
      'amount': 91.27
    },
    'exchangeRate': 2274.05,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Зинаида',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'QIWI',
        'accountNumber': '0000 0000 0000 5506'
      },
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 9062'
      }
    ],
    'minAmount': 2
  },
  {
    'id': 'SdBDm73BHiF53MzwheFxi',
    'balance': {
      'currency': 'RUB',
      'amount': 1015696
    },
    'exchangeRate': 7904.73,
    'isVerified': true,
    'status': 'buyer',
    'userName': 'Алина',
    'wallet': {
      'currency': 'KEKS',
      'address': 'k7l9qvzbtsza6o5e2s3xo8gm2kd40op17s410fg6'
    },
    'minAmount': 8809
  },
  {
    'id': 'Td73aKZDE3fZjVWekunX_',
    'balance': {
      'currency': 'KEKS',
      'amount': 57.36
    },
    'exchangeRate': 9409.59,
    'isVerified': false,
    'status': 'seller',
    'userName': 'Анастасия',
    'paymentMethods': [
      {
        'currency': 'RUB',
        'provider': 'Tinkoff',
        'accountNumber': '0000 0000 0000 3215'
      },
      {
        'currency': 'RUB',
        'provider': 'Sberbank',
        'accountNumber': '0000 0000 0000 1719'
      },
      {
        'currency': 'RUB',
        'provider': 'QIWI',
        'accountNumber': '0000 0000 0000 5002'
      }
    ],
    'minAmount': 2
  }
];
