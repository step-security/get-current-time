import {jest} from '@jest/globals'

const mockCore = {
    getInput: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn(),
    info: jest.fn()
}

jest.unstable_mockModule('@actions/core', () => mockCore)
jest.unstable_mockModule('./subscription.js', () => ({
    default: jest.fn().mockResolvedValue(undefined)
}))

const {default: action} = await import('./action.js')

const fixedNow = new Date('2020-07-01T00:30:15.000Z').valueOf()
const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(fixedNow)

describe('action', () => {
    beforeEach(() => {
        mockCore.getInput.mockReset()
        mockCore.setOutput.mockReset()
        mockCore.setFailed.mockReset()
        mockCore.info.mockReset()
    })

    afterAll(() => {
        nowSpy.mockRestore()
    })

    it('Should load', () => {
        expect(action).not.toBeNull()
    })

    it('Should correctly set outputs', async () => {
        mockCore.getInput.mockImplementation((input) => {
            switch (input) {
                case 'utcOffset':
                    return ''
                case 'format':
                    return ''
                case 'timezone':
                    return ''
            }
        })
        await action()
        expect(mockCore.setOutput.mock.calls).toEqual([
            ['time', '2020-07-01T00:30:15.000Z'],
            ['ISOTime', '2020-07-01T00:30:15.000Z'],
            ['readableTime', 'Wed Jul 01 2020 00:30:15 GMT+0000'],
            ['formattedTime', '2020-07-01T00:30:15Z'],
            ['year', 2020],
            ['month', 7],
            ['day', 1],
            ['hour', 0],
            ['minute', 30],
            ['second', 15],
            ['millisecond', 0]
        ])
    })

    it('Should correctly set outputs with utcOffset', async () => {
        mockCore.getInput.mockImplementation((input) => {
            switch (input) {
                case 'utcOffset':
                    return '+08:00'
                case 'format':
                    return 'YYYYMMDD-HH'
                case 'timezone':
                    return ''
            }
        })
        await action()
        expect(mockCore.setOutput.mock.calls).toEqual([
            ['time', '2020-07-01T00:30:15.000Z'],
            ['ISOTime', '2020-07-01T00:30:15.000Z'],
            ['readableTime', 'Wed Jul 01 2020 08:30:15 GMT+0800'],
            ['formattedTime', '20200701-08'],
            ['year', 2020],
            ['month', 7],
            ['day', 1],
            ['hour', 8],
            ['minute', 30],
            ['second', 15],
            ['millisecond', 0]
        ])
    })

    it('Should correctly set outputs with timezone', async () => {
        mockCore.getInput.mockImplementation((input) => {
            switch (input) {
                case 'utcOffset':
                    return '+08:00'
                case 'format':
                    return 'YYYYMMDD-HH'
                case 'timezone':
                    return 'America/Los_Angeles'
            }
        })
        await action()
        expect(mockCore.setOutput.mock.calls).toEqual([
            ['time', '2020-07-01T00:30:15.000Z'],
            ['ISOTime', '2020-07-01T00:30:15.000Z'],
            ['readableTime', 'Tue Jun 30 2020 17:30:15 GMT-0700'],
            ['formattedTime', '20200630-17'],
            ['year', 2020],
            ['month', 6],
            ['day', 30],
            ['hour', 17],
            ['minute', 30],
            ['second', 15],
            ['millisecond', 0]
        ])
    })

    it('Should throw error', async () => {
        mockCore.setOutput.mockImplementation(() => {
            throw new Error('#')
        })
        await action()
        expect(mockCore.setFailed).toHaveBeenCalledWith('#')
    })
})