import React from 'react'
import { Table } from 'antd'
import { DetailTable } from '@/components/DetailTable'
import ErrorButton from '@/components/ErrorButton'

import { mount } from 'enzyme'
import '../__mocks__/matchMedia.mock';

describe('test DetailTable ', () => {
  test('should return antd table component', () => {
    const wrapper = mount(<DetailTable />)
    expect(wrapper.find(Table)).toExist()
  })

  test('if there had failed item, should had a error button item', () => {
    const title = 'should have an error button item'
    const mockProps = {
      data: [
        { 
          failureMessages: 'failed',
          fileAttachInfos: {
            [title]: 'image01.jpg'
          },
          fullName: title
        }
      ]
    }
    const wrapper = mount(<DetailTable {...mockProps} />)
    expect(wrapper.find(ErrorButton)).toExist()
  })
})

test('Top level test in a file', () => {
  const title = 'top level test'
  const mockProps = {
    data: [
      {
        ancestorTitles: [],
        fileAttachInfos: {
          [title]: 'image01.jpg'
        },
        fullName: title,
        title,
        status: 'passed',
        duration: 2,
        failureMessages: [],
      },
    ],
  }
  const wrapper = mount(<DetailTable {...mockProps} />)
  expect(wrapper.text()).toEqual(expect.stringMatching(title))
})

describe('Nested describes', () => {
  test('Top level test in a describe should be prepended by describe name', () => {
    const describeTitle = 'Nested describes'
    const title = 'top level describe test'
    const mockProps = {
      data: [
        {
          ancestorTitles: [describeTitle],
          fullName: `${describeTitle} > ${title}`,
          fileAttachInfos: {
            [title]: 'image01.jpg'
          },
          title,
          status: 'passed',
          duration: 2,
          failureMessages: [],
        },
      ],
    }
    const wrapper = mount(<DetailTable {...mockProps} />)
    expect(wrapper.text()).toEqual(
      expect.stringMatching(`${describeTitle} > ${title}`),
    )
  })

  describe('Secondary describe', () => {
    const describeTitle1 = 'Nested describes'
    const describeTitle2 = 'Secondary describe'
    const title = 'secondary describe test'
    const mockProps = {
      data: [
        {
          ancestorTitles: [describeTitle1, describeTitle2],
          fullName: [describeTitle1, describeTitle2, title].join(' '),
          failureMessages: 'failed',
          fileAttachInfos: {
            [title]: 'image01.jpg'
          },
          title,
          status: 'passed',
          duration: 2,
        },
      ],
    }
    test('Secondary test should be prepended by describe name', () => {
      const wrapper = mount(<DetailTable {...mockProps} />)
      expect(wrapper.text()).toEqual(
        expect.stringMatching(
          [describeTitle1, describeTitle2, title].join(' > '),
        ),
      )
    })
  })
})
