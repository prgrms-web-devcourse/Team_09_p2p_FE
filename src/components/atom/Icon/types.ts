import { IMAGE_URL } from '~/utils/constants/images';

export const ICON_URLS = {
  heart: `${IMAGE_URL}/assets/icons/heart.svg`,
  arrow: `${IMAGE_URL}/assets/icons/arrow.svg`,
  arrowLeft: `${IMAGE_URL}/assets/icons/arrow-left.svg`,
  arrowRight: `${IMAGE_URL}/assets/icons/arrow-right.svg`,
  arrowDown: `${IMAGE_URL}/assets/icons/arrow-down.svg`,
  calendar: `${IMAGE_URL}/assets/icons/calendar.svg`,
  marker: `${IMAGE_URL}/assets/icons/marker.svg`,
  route: `${IMAGE_URL}/assets/icons/route.svg`,
  bookmarkActive: `${IMAGE_URL}/assets/icons/bookmark-active.svg`,
  bookmarkInactive: `${IMAGE_URL}/assets/icons/bookmark-inactive.svg`,
  heartActive: `${IMAGE_URL}/assets/icons/heart-active.svg`,
  heartInactive: `${IMAGE_URL}/assets/icons/heart-inactive.svg`,
  share: `${IMAGE_URL}/assets/icons/share.svg`,
  search: `${IMAGE_URL}/assets/icons/search.svg`,
  searchBlue: `${IMAGE_URL}/assets/icons/search-blue.svg`,
  close: `${IMAGE_URL}/assets/icons/close.svg`,
  thinClose: `${IMAGE_URL}/assets/icons/close-thin.svg`,
  plus: `${IMAGE_URL}/assets/icons/plus.svg`,
  pencil: `${IMAGE_URL}/assets/icons/pencil.svg`,
  comment: `${IMAGE_URL}/assets/icons/comment.svg`,
  commentRound: `${IMAGE_URL}/assets/icons/comment-round.svg`,
  bookmarkThumb: `${IMAGE_URL}/assets/icons/bookmark-thumb.svg`,
  bookmarkThumbActive: `${IMAGE_URL}/assets/icons/bookmark-thumb-active.svg`,
  recommendActive: `${IMAGE_URL}/assets/icons/recommend-active.svg`,
  recommendInactive: `${IMAGE_URL}/assets/icons/recommend-inactive.svg`,
  thinArrow: `${IMAGE_URL}/assets/icons/thinArrow.svg`,
  thinArrowActive: `${IMAGE_URL}/assets/icons/thinArrow-active.svg`,
  thinArrowDisabled: `${IMAGE_URL}/assets/icons/thinArrow-disabled.svg`,
  alert: `${IMAGE_URL}/assets/icons/alert.svg`
};

export type IconName = keyof typeof ICON_URLS;
