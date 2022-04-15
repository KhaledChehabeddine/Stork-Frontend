const getHashCode = (id) => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let hash = '';
  while (id > 0) {
    hash += arr[id % 10];
    id = Math.floor(id / 10);
  }
  return hash;
};

const getSearchParams = (search) => {
  const paramsArray = search.substring(1).split('&');
  const params = {};
  for (let i = 0; i < paramsArray.length; ++i) {
    const p = paramsArray[i].split('=');
    params[p[0]] = p[1];
  }
  return params;
};

const getCurrentDate = () => {
  const arr = Date().split(' ');
  return arr[0] + ', ' + arr[2] + ' ' + arr[1] + ' ' + arr[3] + ' ' + arr[4] + ' GMT';
};

const formatDate = (date) => {
  return date.substring(0, 16).split('T')[0];
}

const countries = {
  'Afghanistan': '93',
  'Aland Islands': '358',
  'Albania': '355',
  'Algeria': '213',
  'American Samoa': '1684',
  'Andorra': '376',
  'Angola': '244',
  'Anguilla': '1264',
  'Antarctica': '672',
  'Antigua and Barbuda': '1268',
  'Argentina': '54',
  'Armenia': '374',
  'Aruba': '297',
  'Australia': '61',
  'Austria': '43',
  'Azerbaijan': '994',
  'Bahamas': '1242',
  'Bahrain': '973',
  'Bangladesh': '880',
  'Barbados': '1246',
  'Belarus': '375',
  'Belgium': '32',
  'Belize': '501',
  'Benin': '229',
  'Bermuda': '1441',
  'Bhutan': '975',
  'Bolivia': '591',
  'Bonaire, Sint Eustatius and Saba': '599',
  'Bosnia and Herzegovina': '387',
  'Botswana': '267',
  'Bouvet Island': '55',
  'Brazil': '55',
  'British Indian Ocean Territory': '246',
  'Brunei Darussalam': '673',
  'Bulgaria': '359',
  'Burkina Faso': '226',
  'Burundi': '257',
  'Cambodia': '855',
  'Cameroon': '237',
  'Canada': '1',
  'Cape Verde': '238',
  'Cayman Islands': '1345',
  'Central African Republic': '236',
  'Chad': '235',
  'Chile': '56',
  'China': '86',
  'Christmas Island': '61',
  'Cocos (Keeling) Islands': '672',
  'Colombia': '57',
  'Comoros': '269',
  'Congo': '242',
  'Congo, Democratic Republic of the Congo': '242',
  'Cook Islands': '682',
  'Costa Rica': '506',
  'Cote D\'Ivoire': '225',
  'Croatia': '385',
  'Cuba': '53',
  'Curacao': '599',
  'Cyprus': '357',
  'Czech Republic': '420',
  'Denmark': '45',
  'Djibouti': '253',
  'Dominica': '1767',
  'Dominican Republic': '1809',
  'Ecuador': '593',
  'Egypt': '20',
  'El Salvador': '503',
  'Equatorial Guinea': '240',
  'Eritrea': '291',
  'Estonia': '372',
  'Ethiopia': '251',
  'Falkland Islands (Malvinas)': '500',
  'Faroe Islands': '298',
  'Fiji': '679',
  'Finland': '358',
  'France': '33',
  'French Guiana': '594',
  'French Polynesia': '689',
  'French Southern Territories': '262',
  'Gabon': '241',
  'Gambia': '220',
  'Georgia': '995',
  'Germany': '49',
  'Ghana': '233',
  'Gibraltar': '350',
  'Greece': '30',
  'Greenland': '299',
  'Grenada': '1473',
  'Guadeloupe': '590',
  'Guam': '1671',
  'Guatemala': '502',
  'Guernsey': '44',
  'Guinea': '224',
  'Guinea-Bissau': '245',
  'Guyana': '592',
  'Haiti': '509',
  'Heard Island and Mcdonald Islands': '0',
  'Holy See (Vatican City State)': '39',
  'Honduras': '504',
  'Hong Kong': '852',
  'Hungary': '36',
  'Iceland': '354',
  'India': '91',
  'Indonesia': '62',
  'Iran, Islamic Republic of': '98',
  'Iraq': '964',
  'Ireland': '353',
  'Isle of Man': '44',
  'Israel': '972',
  'Italy': '39',
  'Jamaica': '1876',
  'Japan': '81',
  'Jersey': '44',
  'Jordan': '962',
  'Kazakhstan': '7',
  'Kenya': '254',
  'Kiribati': '686',
  'Korea, Democratic People\'s Republic of': '850',
  'Korea, Republic of': '82',
  'Kosovo': '381',
  'Kuwait': '965',
  'Kyrgyzstan': '996',
  'Lao People\'s Democratic Republic': '856',
  'Latvia': '371',
  'Lebanon': '961',
  'Lesotho': '266',
  'Liberia': '231',
  'Libyan Arab Jamahiriya': '218',
  'Liechtenstein': '423',
  'Lithuania': '370',
  'Luxembourg': '352',
  'Macao': '853',
  'Macedonia, the Former Yugoslav Republic of': '389',
  'Madagascar': '261',
  'Malawi': '265',
  'Malaysia': '60',
  'Maldives': '960',
  'Mali': '223',
  'Malta': '356',
  'Marshall Islands': '692',
  'Martinique': '596',
  'Mauritania': '222',
  'Mauritius': '230',
  'Mayotte': '269',
  'Mexico': '52',
  'Micronesia, Federated States of': '691',
  'Moldova, Republic of': '373',
  'Monaco': '377',
  'Mongolia': '976',
  'Montenegro': '382',
  'Montserrat': '1664',
  'Morocco': '212',
  'Mozambique': '258',
  'Myanmar': '95',
  'Namibia': '264',
  'Nauru': '674',
  'Nepal': '977',
  'Netherlands': '31',
  'Netherlands Antilles': '599',
  'New Caledonia': '687',
  'New Zealand': '64',
  'Nicaragua': '505',
  'Niger': '227',
  'Nigeria': '234',
  'Niue': '683',
  'Norfolk Island': '672',
  'Northern Mariana Islands': '1670',
  'Norway': '47',
  'Oman': '968',
  'Pakistan': '92',
  'Palau': '680',
  'Palestinian Territory, Occupied': '970',
  'Panama': '507',
  'Papua New Guinea': '675',
  'Paraguay': '595',
  'Peru': '51',
  'Philippines': '63',
  'Pitcairn': '64',
  'Poland': '48',
  'Portugal': '351',
  'Puerto Rico': '1787',
  'Qatar': '974',
  'Reunion': '262',
  'Romania': '40',
  'Russian Federation': '70',
  'Rwanda': '250',
  'Saint Barthelemy': '590',
  'Saint Helena': '290',
  'Saint Kitts and Nevis': '1869',
  'Saint Lucia': '1758',
  'Saint Martin': '590',
  'Saint Pierre and Miquelon': '508',
  'Saint Vincent and the Grenadines': '1784',
  'Samoa': '684',
  'San Marino': '378',
  'Sao Tome and Principe': '239',
  'Saudi Arabia': '966',
  'Senegal': '221',
  'Serbia': '381',
  'Serbia and Montenegro': '381',
  'Seychelles': '248',
  'Sierra Leone': '232',
  'Singapore': '65',
  'Sint Maarten': '1',
  'Slovakia': '421',
  'Slovenia': '386',
  'Solomon Islands': '677',
  'Somalia': '252',
  'South Africa': '27',
  'South Georgia and the South Sandwich Islands': '500',
  'South Sudan': '211',
  'Spain': '34',
  'Sri Lanka': '94',
  'Sudan': '249',
  'Suriname': '597',
  'Svalbard and Jan Mayen': '47',
  'Swaziland': '268',
  'Sweden': '46',
  'Switzerland': '41',
  'Syrian Arab Republic': '963',
  'Taiwan, Province of China': '886',
  'Tajikistan': '992',
  'Tanzania, United Republic of': '255',
  'Thailand': '66',
  'Timor-Leste': '670',
  'Togo': '228',
  'Tokelau': '690',
  'Tonga': '676',
  'Trinidad and Tobago': '1868',
  'Tunisia': '216',
  'Turkey': '90',
  'Turkmenistan': '7370',
  'Turks and Caicos Islands': '1649',
  'Tuvalu': '688',
  'Uganda': '256',
  'Ukraine': '380',
  'United Arab Emirates': '971',
  'United Kingdom': '44',
  'United States': '1',
  'United States Minor Outlying Islands': '1',
  'Uruguay': '598',
  'Uzbekistan': '998',
  'Vanuatu': '678',
  'Venezuela': '58',
  'Viet Nam': '84',
  'Virgin Islands, British': '1284',
  'Virgin Islands, U.s.': '1340',
  'Wallis and Futuna': '681',
  'Western Sahara': '212',
  'Yemen': '967',
  'Zambia': '260',
  'Zimbabwe': '263'
};

const genders = [
  'Male', 'Female'
]

export {getHashCode, getSearchParams, getCurrentDate, formatDate, countries, genders};
