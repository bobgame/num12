/*
 * @CreateTime: Feb 2, 2018 2:52 PM
 * @Author: howe
 * @Contact: ihowe@outlook.com
 * @Last Modified By: howe
 * @Last Modified Time: Sep 17, 2018 11:47 AM
 * @Description: 异步队列处理
 * 目的：用于处理一组串联式的异步任务队列。
 */

export type AsyncCallback = (next: Function, params: any, args: any) => void

interface AsyncTask {
  /**
   * 任务uuid
   */
  uuid: number
  /**
   * 任务开始执行的回调
   * params: push时传入的参数
   * args: 上个任务传来的参数
   */
  callbacks: Array<AsyncCallback>
  /**
   * 任务参数
   */
  params: any
}
export class AsyncQueue {
  /**
   * 是否开启可用
   */
  public get enable() {
    return this.enableTemp
  }
  /**
   * 是否开启可用
   */
  public set enable(val: boolean) {
    if (this.enableTemp === val) {
      return
    }
    this.enableTemp = val
    if (val && this.size > 0) {
      this.play()
    }
  }
  /**
   * 队列长度
   */
  public get size(): number {
    return this.queues.length
  }
  /**
   * 是否有正在处理的任务
   */
  public get isProcessing(): boolean {
    return this.isProcessingTaskUUID > 0
  }
  /**
   * 队列是否已停止
   */
  public get isStop(): boolean {
    if (this.queues.length > 0) {
      return false
    }
    if (this.isProcessing) {
      return false
    }
    return true
  }
  /** 正在执行的任务参数 */
  public get runningParams() {
    if (this.runningAsyncTask) {
      return this.runningAsyncTask.params
    }
    return null
  }

  // 任务task的唯一标识
  private static uuidCount = 1
  // 正在运行的任务
  private runningAsyncTask: any = null

  private queues: Array<AsyncTask> = []

  // 正在执行的异步任务标识
  private isProcessingTaskUUID = 0

  private enableTemp = true

  /**
   * 任务队列完成回调
   */
  public complete: any = null

  /**
   * push一个异步任务到队列中
   * 返回任务uuid
   */
  public push(callback: AsyncCallback, params: any = null): number {
    const uuid = AsyncQueue.uuidCount++
    this.queues.push({
      uuid,
      callbacks: [callback],
      params
    })
    return uuid
  }

  /**
   * push多个任务，多个任务函数会同时执行,
   * 返回任务uuid
   */
  public pushMulti(params: any, ...callbacks: AsyncCallback[]): number {
    const uuid = AsyncQueue.uuidCount++
    this.queues.push({
      uuid,
      callbacks,
      params
    })
    return uuid
  }

  /** 移除一个还未执行的异步任务 */
  public remove(uuid: number) {
    if (this.runningAsyncTask.uuid === uuid) {
      console.warn('正在执行的任务不可以移除')
      return
    }
    for (let i = 0, len = this.queues.length; i < len; i++) {
      if (this.queues[i].uuid === uuid) {
        this.queues.splice(i, 1)
        break
      }
    }
  }

  /**
   * 清空队列
   */
  public clear() {
    this.queues = []
    this.isProcessingTaskUUID = 0
    this.runningAsyncTask = null
  }

  protected next(taskUUID: number, args: any = null) {
    // console.log("完成一个任务")
    if (this.isProcessingTaskUUID === taskUUID) {
      this.isProcessingTaskUUID = 0
      this.runningAsyncTask = null
      this.play(args)
    } else {
      console.warn(
        '[AsyncQueue] 错误警告：正在执行的任务和完成的任务标识不一致，有可能是next重复执行！ProcessingTaskUUID：' +
          this.isProcessingTaskUUID +
          ' nextUUID:' +
          taskUUID
      )
      if (this.runningAsyncTask) {
        // console.log(this.runningAsyncTask)
      }
    }
  }
  /**
   * 跳过当前正在执行的任务
   */
  public step() {
    if (this.isProcessing) {
      this.next(this.isProcessingTaskUUID)
    }
  }
  /**
   * 开始运行队列
   */
  public play(args: any = null) {
    if (this.isProcessing) {
      return
    }
    if (!this.enableTemp) {
      return
    }
    const actionData: any = this.queues.shift()
    if (actionData) {
      this.runningAsyncTask = actionData
      const taskUUID: number = actionData.uuid
      this.isProcessingTaskUUID = taskUUID
      const callbacks: Array<AsyncCallback> = actionData.callbacks

      if (callbacks.length === 1) {
        const nextFunc = (nextArgs: any = null) => {
          this.next(taskUUID, nextArgs)
        }
        callbacks[0](nextFunc, actionData.params, args)
      } else {
        // 多个任务函数同时执行
        let fnum: number = callbacks.length
        const nextArgsArr: any[] = []
        const nextFunc: Function = (nextArgs: any = null) => {
          --fnum
          nextArgsArr.push(nextArgs || null)
          if (fnum === 0) {
            this.next(taskUUID, nextArgsArr)
          }
        }
        const knum = fnum
        for (let i = 0; i < knum; i++) {
          callbacks[i](nextFunc, actionData.params, args)
        }
      }
    } else {
      this.isProcessingTaskUUID = 0
      this.runningAsyncTask = null
      // console.log("任务完成")
      if (this.complete) {
        this.complete(args)
      }
    }
  }
}
