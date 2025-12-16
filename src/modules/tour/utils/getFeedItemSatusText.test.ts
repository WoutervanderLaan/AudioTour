import {getFeedItemStatusText} from './getFeedItemStatusText'

describe('getFeedItemStatusText', () => {
  it('should return "Uploading photos..." for uploading status', () => {
    expect(getFeedItemStatusText('uploading')).toBe('Uploading photos...')
  })

  it('should return "Processing..." for processing status', () => {
    expect(getFeedItemStatusText('processing')).toBe('Processing...')
  })

  it('should return "Generating narrative..." for generating_narrative status', () => {
    expect(getFeedItemStatusText('generating_narrative')).toBe(
      'Generating narrative...',
    )
  })

  it('should return "Generating audio..." for generating_audio status', () => {
    expect(getFeedItemStatusText('generating_audio')).toBe(
      'Generating audio...',
    )
  })

  it('should return "Ready" for ready status', () => {
    expect(getFeedItemStatusText('ready')).toBe('Ready')
  })

  it('should return "Error occurred" for error status', () => {
    expect(getFeedItemStatusText('error')).toBe('Error occurred')
  })
})
