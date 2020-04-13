// vue3响应式原理
// 基于ES6 Proxy

const isObject = val => val !== null && typeof val === 'object'

// 防止重复代理：将之前代理结果缓存，如果已经存在则直接返回
const toProxy = new WeakMap() // 形如{obj: observed}
const toRaw = new WeakMap() // 形如{observed: obj}

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  // 先查缓存
  if (toProxy.has(obj)) {
    // obj是已经代理过的原始对象
    return toProxy.get(obj)
  }

  if (toRaw.has(obj)) {
    // obj已经是一个Proxy对象
    return obj
  }

  // 创建一个Proxy对象
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      console.log('获取', key);
      const ret = Reflect.get(target, key, receiver)
      // 触发依赖收集
      track(target, key)
      return isObject(ret) ? reactive(ret) : ret
    },
    set(target, key, value, receiver) {
      console.log('设置', key);

      const ret = Reflect.set(target, key, value, receiver)
      // 触发操作：遍历执行key相关的所有响应函数
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key) {
      console.log('删除', key);
      const ret = Reflect.deleteProperty(target, key)
      trigger(target, key)
      return ret
    }
  })

  // 缓存结果
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}

// 保存响应函数的数组
const effectStack = []

// effect函数：将用户编写的响应函数放入effectStack
function effect(fn) {
  const rxEffect = function () {
    //捕获可能的异常
    try {
      // 1.入栈
      effectStack.push(fn)
      // 2.执行
      return fn()
    } catch (error) {
      console.error(error);

    } finally {
      effectStack.pop()
    }
  }
  // 执行一次，用于触发getter
  rxEffect()
  return rxEffect
}

// 依赖收集函数track
let targetMap = new WeakMap()
function track(target, key) {
  // 从栈中获取响应函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target对应的map
    let depsMap = targetMap.get(target)

    if (!depsMap) {
      // 首次访问，不存在，需要创建这个map
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    // 获取key相关的所有响应函数数组
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }

    // 把effect放入deps
    if (!deps.has(effect)) {
      deps.add(effect)
    }
  }
}

// 触发函数：获取target，key关联的所有响应函数并执行它们
function trigger(target, key) {
  // 获取依赖表
  const depsMap = targetMap.get(target)
  if (depsMap) {
    // 获取响应函数集合
    const deps = depsMap.get(key)
    // 遍历执行
    deps.forEach(effect => {
      effect()
    })
  }
}

const state = reactive({
  foo: 'foo',
  bar: { a: 1 },
  arr: [1, 2, 3]
})

// const state2 = reactive(state)
// console.log(state === state2);

effect(() => {
  console.log(state.foo);

})
effect(() => { 
  console.log(state.bar.a);
  
})


// state.foo
state.foo = 'foooooooooo'
// state.dong = 'dong'
// delete state.dong
state.bar.a = 'aaa'
// state.arr.push(1)
// state.arr[3] = 4
// delete state.arr[3]