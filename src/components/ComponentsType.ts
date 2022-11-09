/**
 * 버튼 아이콘 이름
 * @see MENU 카테고리 메뉴
 * @see MY 마이페이지
 * @see SEARCH 검색
 * @see CART 장바구니
 * @see REVIEW 리뷰
 * @see HOME 홈
 * @see REVIEW 리뷰 별
 * @see VIEW 찜하기같지만 찜하기가 아닌 하트
 * @see CLOSE 닫기
 * @see INFO 인포메이션
 * @see RIGHT_ARROW 오른쪽 방향 화살표
 */
export enum IconType {
  MENU = "menuButton",
  MY = "myButton",
  MYHOVER = "myHoverButton",
  SEARCH = "searchButton",
  CART = "basketButton",
  CARTHOVER = "basketHoverButton",
  REVIEW = "reviewButton",
  REVIEWHOVER = "reviewHoverButton",
  HOME = "homeButton",
  HOMEHOVER = "homeHoverButton",
  PREVPAGE = "prevpage",
  STAR = "star",
  STAR_EMPTY = "starEmpty",
  HEART = "heart",
  CLOSE = "close",
  INFO = "info",
  RIGHT_ARROW = "rightArrow",
  LEFT_ARROW = "leftArrow",
  MINUS = "minus",
  PLUS = "plus",
  PAIR_ARROW = "Pair_arrow",
  REFLESH = "RefleshIcon",
}

export enum CommmonSVGType {
  CLOSE = "close",
}

export enum InputIconType {
  CHECK = "check",
  CHECKED = "checked",
}

/**
 * 정렬관련 이름
 * @see TOP 위쪽 정렬
 * @see BOTTOM 아래쪽 정렬
 * @see RIGHT 오른쪽 정렬
 * @see LEFT 왼쪽 정렬
 * @see CENTER 가운데 정렬
 */
export enum AlignType {
  TOP = "top",
  BOTTOM = "bottom",
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

/**
 * 정렬관련
 * @see COL 세로방향 정렬
 * @see ROW 가로방향 정렬
 * @see REVERSECOL 세로방향 반대로
 * @see REVERSEROW 가로방향 반대로
 */
export enum DirectionType {
  COL = "col",
  ROW = "row",
  REVERSECOL = "reverseCol",
  REVERSEROW = "reverseRow",
}

/**
 * flex 정렬관련
 * @see START 시작점 기준 정렬
 * @see CENTER 가운데 정렬
 * @see END 끝점 기준 정렬
 * @see STRECH Item을 눌려서 채움
 * @see BETWEEN 시작 Item은 시작점에, 마지막 Item은 끝점에 정렬되고 나머지 Items는 사이에 고르게 정렬됨
 * @see AROUND Items를 균등한 여백을 포함하여 정렬
 */
export enum FlexAlignType {
  START = "start",
  CENTER = "center",
  END = "end",
  STRECH = "strech",
  BETWEEN = "between",
  AROUND = "around",
}

/**
 * 남은기간 타이머
 * @see BAR 이미지 썸네일에서 사용하는 바 형태
 * @see ICON 상품 상세에서 아이콘과 함께 사용하는 헝태
 * @see FLOATING 모바일 하단 플로팅 형태
 */
export enum TimerType {
  BAR = "bar",
  ICON = "icon",
  FLOATING = "floating",
}

/**
 * 상품 목록 리스트
 * @see ALBUM 이미지 정사각형 - PC: 4단, MOBILE: 2단
 * @see CARD 이미지 직사각형 - PC: 3단, MOBILE: 1단
 * @see LIST 한줄 한줄 리스트형
 */
export enum ProductListType {
  ALBUM = "ALBUM",
  CARD = "CARD",
  LIST = "LIST",
}

/**
 * 이미지 썸네일 타입
 * @see SQUARE 정사각
 * @see RECTANGLE 직사각
 */
export enum ThumnailType {
  SQUARE = "square",
  RECTANGLE = "rectangle",
}

/**
 * 뱃지 라벨 스타일
 * @see BORDER 보더 라벨
 * @see BLOCK 색상채움 라벨
 */
export enum BadgeStyle {
  BORDER = "border",
  BLOCK = "block",
}

/**
 * 뱃지 라벨 타입
 * @see DEALS_TWO 둘이모여
 * @see DEALS_TOGETHER 모두모여
 * @see FREE_SHIPPING 무료배송
 * @see MILEAGE 적립금
 * @see TIME_SALE 타임특가
 * @see MILEAGE_EVENT 1,3,5 이벤트
 * @see LOWEST_PRICE 최저가보장
 */
export enum BadgeType {
  DEFAULT = "DEFAULT",
  DEALS_TWO = "DEALS_TWO",
  DEALS_TOGETHER = "DEALS_TOGETHER",
  FREE_SHIPPING = "FREE_SHIPPING",
  MILEAGE = "MILEAGE",
  TIME_SALE = "TIME_SALE",
  MILEAGE_EVENT = "MILEAGE_EVENT",
  LOWEST_PRICE = "LOWEST_PRICE",
}

/**
 * Number 컴포넌트 타입
 * @see DEFAULT 기본 숫자만
 * @see MIDDLE_LINE 할인가 가운데 선 쫙 가는거
 * @see RATE 뒤에 퍼센트 붙여줌
 * @see DISCOUNT 앞에 마이너스 붙여줌
 * @see PRICE 뒤에 '원' 붙여줌
 */
export enum NumberType {
  DEFAULT = "default",
  MIDDLE_LINE = "middleLine",
  RATE = "rate",
  DISCOUNT = "discount",
  PRICE = "price",
}

/**
 * Carousel 컴포넌트 타입
 * @see SLIDE 메인 상단 슬라이드 배너
 * @see LIST 일반 이미지 배너
 * @see PRODUCT 상품 상세
 */
export enum CarouselType {
  SLIDE = "SLIDE",
  IMAGE = "IMAGE",
  PRODUCT = "PRODUCT",
}

/**
 * Carousel 컴포넌트 타입
 * @see SELF 사이트 내에서 라우터 이동
 * @see DSELF 다른 사이트로 이동
 * @see BLANK 넘어온 주소 그대로 새창열기
 */
export enum LinkTargetType {
  NONE = "",
  SELF = "SELF",
  DSELF = "DSELF",
  BLANK = "BLANK",
}

/**
 * Button 컴포넌트 타입
 * @see NORMAL bg 색이 채워진 일반 컬러 버튼
 * @see BORDER bg 없이 보더 있는 버튼
 */
export enum ButtonType {
  NORMAL = "normal",
  BORDER = "border",
}

/**
 * Button 사이즈
 * @see LG
 * @see MD
 * @see SM
 * @see XS
 */
export enum ButtonSizeType {
  LG = "lg",
  LMD = "lmd",
  MD = "md",
  SM = "sm",
  XSM = "xsm",
  XS = "xs",
}

/**
 * Button 컬러
 * @see LG
 * @see MD
 * @see SM
 * @see XS
 */
export enum ButtonColorType {
  PRIMARY = "primary",
  DARK = "dark",
  DARK_GREY = "dark_grey",
  LIGHT_GREY = "light_grey",
  BLACK = "black",
  RED = "red",
  GREEN = "green",
  DISABLED = "disabled",
  KAKAO = "kakao",
  NAVER = "naver",
  FACEBOOK = "facebook",
  GOOGLE = "google",
}

/**
 * Arrow 방향
 * @see LEFT
 * @see RIGHT
 * @see TOP
 * @see BOTTOM
 */
export enum ArrowButtonType {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export enum NoneType {
  CART = "cart",
  SEARCH = "search",
  ORDER = "order",
  REVIEW_WRITE = "reviewWrite",
  REVEIW = "review",
  QNA = "qna",
  MILEAGE = "mileage",
  PAGE = "page",
  ADDRESS = "address",
}

export enum PriceType {
  SALE = "sale",
  OPTION = "option",
  PRODUCT = "product",
  SHIPPING = "shipping",
  TOTAL = "total",
}

export enum ProductItemType {
  MOBILE = "moPurchase",
  INFOAREA = "infoPurchase",
  STICKYAREA = "stickyPurchase",
}

/**
 * 각종 문구를 모아주세요
 * @see LOWEST_PRICE 최저가보장 안내문구
 * @see MILEAGE_EVENT 1.3.5문구
 */
export enum Sentence {
  LOWEST_PRICE = `동종업체에서 판매되는 가격보다 비쌀 경우 차액을 보상하는 제도
  <span><sub>*</sub>상세페이지 내용 참고</span>`,
  MILEAGE_EVENT = `만원, 3만원, 5만원 이상 주문 시 금액별 적립금 추가 지급 이벤트
  <span><sub>*</sub>주말특가 상품 포함 주문 시 (배송비 제외)</span>`,
  ADD_CART = `장바구니에 상품을 담았습니다. <br /> 쇼핑을 계속 원하시면 [쇼핑계속하기] 버튼을 눌러주세요`,
}
