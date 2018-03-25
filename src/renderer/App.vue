<template>
  <div id="app">
    <input type="text" v-model="clipboardText" class="clipboard-input" ref="clipboard">
    <div class="textareas">
      <div class="textarea-box">
        <ul class="textarea-list">
          <li class="item" :key="index" v-for="(textarea, index) in textareas">
            <textarea :value="textarea"
                      @input="updateText($event, index)"
                      @dblclick="deleteText(index)"
                      cols="30"
                      rows="10"></textarea>
          </li>
        </ul>
        <div class="textareas-add" @click="addTextarea">+</div>
      </div>
      <div class="result-message" v-show="showResult">
        <p>红色代表文件之间不一致的地方，绿色代表一致的地方，黑色代表悲伤，蓝色代表忧郁...</p>
      </div>
      <div class="result-box" v-show="showResult">
        <ul class="result-list">
          <li class="item" v-for="(result, index) in results">
            <div class="indexs" v-if="index === 0">
              <p class="index" v-for="i in result.length">
                <span>{{ i }}</span>
                <span>&nbsp;</span>
              </p>
            </div>
            <div class="contents">
              <p v-for="(text, i) in result" class="text" :class="{ every: text.every }">
                <span>{{ text.text }}</span>
                <span class="copy" @click.stop="copyToClipboard(text.text)">（复制）</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="get-result">
      <button class="pa" @click="getResult" :disabled="showResult">啪啪啪</button>
      <button class="he" @click="resetResult" :disabled="!showResult">嘿嘿嘿</button>
      <span class="copyright">蔡小小的御用文本对比工具 v1.0</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'text-diff',
    data() {
      return {
        clipboardText: '',
        showResult: false,
        results: {},
        textareas: [
          '输入多行文本\n比如万科',
          '这边是用来对比的文本\n格式都一样\n一行一个\n如果有bug\n请不要联系我'
        ]
      }
    },
    mounted() {
      alert('欢迎使用叼叼叼！');
    },
    methods: {
      copyToClipboard(text) {
        this.clipboardText = text
        // $nextTick 在这里没用
        setTimeout(() => {
          this.$refs.clipboard.select()
          document.execCommand('Copy')
        })
      },
      updateText($event, index) {
        this.textareas[index] = $event.target.value
      },
      addTextarea() {
        this.textareas.push('')
      },
      deleteText(index) {
        this.textareas.splice(index, 1)
      },
      resetResult() {
        this.results = {}
        this.showResult = false
      },
      getResult() {
        const textareas = this.textareas.map(textarea => textarea.split('\n'))
        // console.log('计算结果', textareas)

        // 每个编辑器
        const result = textareas.map((textarea, index) => {

          // console.log('textarea1', textarea)

          // 每个编辑器的内容文字
          textarea = textarea
          .map(text => {
            
            const otherTextareas = textareas.filter((t, i) => i !== index)
            const isEvery = otherTextareas.every(ot => ot.includes(text))
            // console.log('text', text, 'isCommon', isEvery)

            return {
              text: text,
              every: isEvery
            }
          })
          .sort((a, b) => a.text.toString().localeCompare(b.text, ['zh-Hans-CN', 'co'], {
            sensitivity: 'base',
          }))
          .sort((a, b) => !a.every)

          // console.log('textarea2', textarea)

          return textarea
        })

        console.log('result', result)
        this.results = result
        this.showResult = true
        // 每一个输入区都是一个数组（一堆文字）
        // 从第一个输入区的数组的每个元素开始于后面的进行对比
      }
    },
  }
</script>

<style>
  body {
    margin: 0;
    font-size: 14px;
  }

  * {
    font-size: 1rem;
    outline: none;
  }
</style>

<style lang="scss" scoped>
  #app {

    .clipboard-input {
      height: 0px;
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
    }

    > .textareas {
      padding: 1rem;

      > .textarea-box {
        width: 100%;
        height: 30rem;
        display: flex;

        > .textarea-list {
          padding: 0;
          margin: 0;
          list-style: none;
          width: calc(100% - 8rem);
          display: flex;

          > .item {
            height: 100%;
            margin-right: 1rem;
            flex-grow: 1;

            > textarea {
              width: 100%;
              height: 100%;
              border: none;
              background-color: #efefef;
              padding: 0.4rem;
              box-sizing: border-box;
              line-height: 1.4;
              font-size: .8rem;
              color: #333;

              &:focus {
                background-color: #ddd;
              }
            }
          }
        }

        > .textareas-add {
          height: 100%;
          line-height: 30rem;
          width: 8rem;
          // margin-left: 1rem;
          text-align: center;
          font-size: 2rem;
          border: 2px dashed #999;
          background-color: #efefef;
          cursor: pointer;
          box-sizing: border-box;

          &:hover {
            background-color: #ddd;
          }
        }
      }

      > .result-message {
        position: absolute;
        width: calc(100% - 2rem);
        top: 1rem;
        left: 1rem;
        height: 2rem;
        line-height: 2rem;
        text-align:  center;
        background-color: yellow;
        color: red;

        > p {
          margin: 0;
        }
      }

      > .result-box {
        position: absolute;
        width: calc(100% - 2rem);
        top: 3rem;
        left: 1rem;
        height: 28rem;
        background-color: #404040;
        color: #fff;
        overflow-y: auto;

        > .result-list {
          margin: 0;
          padding: 0;
          display: flex;
          // overflow-y: auto;
          list-style-type: none;

          > .item {
            height: 100%;
            display: flex;
            // flex-grow: 1;

            > .indexs {

              > .index {
                margin: 0;
                height: 1.5rem;
                line-height: 1.5rem;
                width: 2rem;
                text-align: center;
                border-bottom: 1px solid #fff;
                background-color: blue;
                font-size: 0.8rem;
              }
            }

            > .contents {

              > .text {
                margin: 0;
                min-width: 10rem;
                height: 1.5rem;
                line-height: 1.5rem;
                text-indent: 1rem;
                background-color: #d84949;
                border-bottom: 1px solid #fff;
                border-right: 1px solid #fff;
                padding-right: 1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                > .index {
                  margin-right: 1rem;
                  padding-right: .5rem;
                  border-right: 1px solid #fff;
                }

                > .copy {
                  color: yellow;
                  font-size: .8rem;
                  cursor: pointer;

                  &:hover  {
                    text-decoration: underline;
                  }
                }

                &.every {
                  background-color: #179016;
                }
              }
            }
          }
        }
      }
    }

    > .get-result {
      text-align: center;
      background-color:  #eee;
      padding: .5rem 0;
      position: relative;

      > .copyright {
        position: absolute;
        right: 1rem;
        bottom: .6rem;
        font-size: .8rem;
        color: #ccc;
      }

      > button {
        // border-radius: 3px;
        width: 7rem;
        height: 2rem;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 1rem;

        &[disabled] {
          opacity: .7;
          cursor: no-drop;
        }

        &.pa {
          background-color: #555;
          margin-right: 1rem;

          &:hover  {
            background-color: #333;
          }
        }

        &.he {
          background-color: #d84949;

          &:hover  {
            background-color: #b52b2b;
          }
        }
      }
    }
  }
</style>
