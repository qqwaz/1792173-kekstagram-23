
const PHOTOS_QUANTITY = 25;
const LIKES_RANGE = [15, 200];
const COMMENTS_RANGE = [0, 10];
const PHOTO_DESCRIPTIONS = [
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / I\'ve bought some potatoes.',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Вот это тачка! #wow #car #carwow #drive',
  'Отдыхаем... #chill #relax #group #photo',
  '#fun #party #cool #young',
  'Норм',
  '',
];
const COMMENT_MESSAGES = [
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.',
  'Всё отлично!',
];
const COMMENT_NAMES = [
  'Николай',
  'Харитон',
  'Степан',
  'Тимур',
  'Аким',
  'Ким',
];


const getIntFromRange = (min, max) =>
  min >= 0 && Math.ceil(min) <= Math.floor(max)
    ? Math.floor(Math.random() * (max - min + 1) + min)
    : -1;


const getRandomFromArray = (array) => array[getIntFromRange(0, array.length - 1)];


const createShuffledArrayOfNaturals = (length) => {
  const array = Array.from({length: length}, (_, i) => i + 1);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const generatePhotos = () => createShuffledArrayOfNaturals(PHOTOS_QUANTITY)
  .map((x) => ({
    id: x,
    url: `photos/${x}.jpg`,
    description: getRandomFromArray(PHOTO_DESCRIPTIONS),
    likes: getIntFromRange(...LIKES_RANGE),
    comments: [...Array(getIntFromRange(...COMMENTS_RANGE))]
      .map((_, i) => ({
        id: i,
        avatar: `img/avatar-${getIntFromRange(1, 6)}.svg`,
        message: getRandomFromArray(COMMENT_MESSAGES),
        name: getRandomFromArray(COMMENT_NAMES),
      })),
  }));


export { generatePhotos };
