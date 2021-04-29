

// index.d.ts의 기본 선언 방식을 앰비어트 선언(ambient declarations)라고 한다.비어트 선언의 앰비어트(ambient)라는 말은 타입스크립트 컴파일러에 JS에 대한 구현 '환경'에 대한 정보를 준다라고 이해할 수 있다.


// 전역 선언(Global Export) - 각 선언은 명시적으로 임포트하지 않고도 프로젝트의 모든 파일에서 전역적으로 사용이 가능
//declare const Swiper: (target: SwiperParm, option?: IObj) => void;
declare class Swiper {
    /**
     * Constructs a new Swiper instance.
     *
     * @param container Where Swiper applies to.
     * @param options   Instance options.
     */
    constructor(container: SwiperParm, options?: IObj);
}


/*export나 import 키워드를 쓰게 되면 컴파일러가 파일을 모듈로 인식을 해서 명시적으로 임포트 시키야됨!*/
// 모듈 선언(ES2015 Export)
//export default Swiper;

// 모듈 선언(CommonJS Export)
//export = Swiper;