declare module 'Type_CommonUI' {
    interface Iiscrolls {
        cash: IJqMap | null;
        num: number;
        init(target: string, option: IObj): void;
        resize(): void;
    }
    interface IJqMap {
        map: IObj | null;
        put<T>(key:string | number, value: T): void;
        get<T>(key:string | number): T;
        containsKey(key:string | number): boolean;
        clear(): void;
        remove(key:string | number): void;
        keys(): (string | number)[];
        values(): any[];
        size(): number;
    }

    /*type*/
    type SwiperParam = string | HTMLElement;
    type slideSortParam = 'slick' | 'swiper';
    
}

