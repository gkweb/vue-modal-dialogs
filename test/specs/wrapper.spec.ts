'use strict'

import { vi, expect, describe, beforeEach, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { wrappers } from 'vue-modal-dialogs/wrapper'
import TestComponent from '../components/test.vue'
import { create, DialogsWrapper } from 'vue-modal-dialogs'

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Dialogs wrapper', () => {
  // 'clear the internal states',
  beforeEach(() => {
    Object.keys(wrappers).forEach(key => delete wrappers[key])
  })

  describe('the wrapper record', () => {
    it('should have the key `default`', () => {
      const { vm } = mount(DialogsWrapper)
      expect(wrappers.default).to.equal(vm)
    })

    it('should have the key same to the name of the wrapper', () => {
      const { vm } = mount(DialogsWrapper, {
        propsData: { name: 'test' }
      })

      expect(wrappers.test).to.equal(vm)
    })

    it('should override the existing key', async () => {
      const vmTest = mount(DialogsWrapper, {
        propsData: { name: 'test' }
      }).vm
      expect(wrappers.test).to.equal(vmTest)

      // add again
      const vmTest1 = mount(DialogsWrapper, {
        propsData: { name: 'test' }
      }).vm
      expect(wrappers.test).to.equal(vmTest1)
    })

    it('should remove the key when the wrapper is destroyed', () => {
      mount(DialogsWrapper, {
        propsData: { name: 'test' }
      }).destroy()

      expect(wrappers.test).not.to.be.exist
    })
  })

  describe('<transition-group>', () => {
    it('should pass properties to the <transition-group> component', () => {
      const propsData = {
        appear: true,
        appearActiveClass: 'appearActiveClass',
        appearClass: 'appearClass',
        appearToClass: 'appearToClass',
        css: true,
        duration: 'duration',
        enterActiveClass: 'enterActiveClass',
        enterClass: 'enterClass',
        enterToClass: 'enterToClass',
        leaveActiveClass: 'leaveActiveClass',
        leaveClass: 'leaveClass',
        leaveToClass: 'leaveToClass',
        moveClass: 'moveClass',
        name: 'wrapperName',
        transitionName: 'fade',
        tag: 'div',
        type: 'type'
      }

      const { vm} = mount(DialogsWrapper, {
        propsData,
        stubs: {
          'transition-group': false
        }
      })

      const transformedPropsData = Object.assign({}, propsData, { name: propsData.transitionName })
      delete transformedPropsData.transitionName

      expect(vm.$children[0]._props).to.be.deep.equal(transformedPropsData)
    })

    it('should receive the events of <transition-group> component', async () => {
      const spy = vi.fn()

      mount(DialogsWrapper, {
        attrs: { css: false },
        propsData: { transitionName: 'fade' },
        listeners: {
          // Note: other events of the <transition-group> group are not tested because they are not easy to test.
          // If these event can be received correctly, so do other events, due to my implementation.
          'before-enter': spy,
          'before-leave': spy,
          'enter': spy,
          'leave': spy,
          'after-enter': spy,
          'after-leave': spy
        },
        stubs: {
          'transition-group': false
        }
      })

      const promise = create(TestComponent)()
      await delay(100)
      await promise.close()
      await delay(100)

      expect(spy).to.have.toBeCalledTimes(6)
    })
  })
})
