// 类型注解
let var1: string;
var1 = "开课吧";
// var1 = 1

// 类型推论
let var2 = true;
// var2 = 1

// 原始类型：string，number,boolean,undefined,null,symbol
let var3: string | undefined;

// 类型数组
let arr: string[];
arr = ["tom"];

// 任意类型
let varAny: any;
varAny = "xxx";
varAny = 3;

// any用于数组
let arrAny: any[];
arrAny = [1, true, "free"];
arrAny[1] = 100;

// 函数类型约束
function greet(person: string): string {
  return "hello, " + person;
}
const msg = greet("tom");

// void类型
function warn(): void {}

// 对象object,不是原始类型的就是对象类型
function fn1(o: object) {}
fn1({ prop: 0 });
// fn1(1) // no ok

// 正确的姿势
function fn2(o: { prop: number }) {
  o.prop;
}

fn2({ prop: 0 });
// fn2({prop:'tom'}) // no ok

// 类型别名 type，自定义类型
type Prop = { prop: number };
function fn3(o: Prop) {} // 等同于fn2
// type和接口interface的区别，基本完全相同

// interface Prop2 {
//   prop: number
// }

// 类型断言
const someValue: any = "this is a string";
const strLen = (someValue as string).length;

// 联合类型
let union: string | number;
union = "1";
union = 1;

// 交叉类型
type First = { first: number };
type Second = { second: number };
// 扩展新的type
type FirstAndSecond = First & Second;
function fn4(): FirstAndSecond {
  return { first: 1, second: 2 };
}

// 函数
// 1.设置了就是必填参数
// 2.默认值msg = 'abc'
// 3.可选参数？
function greeting(person: string, msg1 = "abc", msg2?: string): string {
  return "";
}
greeting("tom");

// 函数重载：场景主要源码和框架，函数用参数个数、类型或者返回值类型区分同名函数
// 先声明，在实现
// 同名声明有多个
function watch(cb1: () => void): void;
function watch(cb1: () => void, cb2: (v1:any, v2:any) => void): void;
// 实现
function watch(cb1:() => void, cb2?: (v1:any, v2:any) => void) {
  if (cb1 && cb2) {
    console.log('执行重载2');
    
  } else {
    console.log('执行重载1');
    
  }
}

// watch()


// 03-class.ts
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") {}

  // 方法也有修饰符
  private someMethod() {}

  // 存取器：属性方式访问，可添加额外逻辑，控制读写性
  // 可用于计算属性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}
class Child extends Parent {
  say() {
    this.bar
  }
}
const p = new Parent()
const c = new Child()

