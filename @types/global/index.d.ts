// 단지 모듈파일로 만드는 용도
// export{}를 한 이유는 글로벌인 경우 external모듈이어야하기 때문에(규칙) export를 사용하여 꼼수로 에러가 안나도록한다. 글로벌 객체를 확장하기 위해서는 external, ambient 모듈이어야한다.
/*
Typescript의 모듈 방식은 Internal Module(내부 모듈)과 External Module(외부 모듈) 두가지의 모듈이 존재
두 모듈화 방식의 차이는 module-loader의 의존성 여부
- 각 파일의 top-level(아무것으로도 감싸지지 않은 최상위 레벨)에 import나 export가 존재하면 해당 ts파일을 모듈 파일로 생각{External Module(외부 모듈)}
- 각 파일의 top-level에 아무런 import나 export가 존재하지 않는다면 TS는 파일을 모듈이 아닌 스크립트 파일로 생각{Internal Module(내부 모듈)} - 단점: 전역 스코프에 오브젝트로 명명됨. 
    네임스페이스 예>이는 글로벌 네임스페이스를 망칠 수도 있으며 규모가 큰 프로젝트일수록 네임스페이스를 식별하기 어려워질 수 있다.
*/
export{}

//전역(global)선언 - 글로벌 객체를 확장
declare global {
    interface Window{
        CommonUI: any;
    }
    interface HTMLElement {
        iscrolls?: IScroll;
    }
    interface IObj {
        [key: string | number]: any;
    }

    type PromiseCallback = (resolve: (value: any) => void, reject: (reason?: any) => void) => void;
}





