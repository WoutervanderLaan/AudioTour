import {MediaSourceType} from '@/modules/tour/services/cameraService'
import {getPermissionContent} from '@/modules/tour/utils/permissionContent'

describe('permissionContent', () => {
  describe('getPermissionContent', () => {
    it('should return camera content when source type is camera', () => {
      const content = getPermissionContent(MediaSourceType.camera)

      expect(content.title).toBe('Camera Access Required')
      expect(content.icon).toBe('photo-camera')
      expect(content.description).toContain('camera')
      expect(content.primaryButtonLabel).toBe('Enable Camera')
      expect(content.benefits).toHaveLength(3)
    })

    it('should return library content when source type is library', () => {
      const content = getPermissionContent(MediaSourceType.library)

      expect(content.title).toBe('Photo Library Access Required')
      expect(content.icon).toBe('photo-library')
      expect(content.description).toContain('photo library')
      expect(content.primaryButtonLabel).toBe('Enable Photo Library')
      expect(content.benefits).toHaveLength(3)
    })

    it('should include expected benefits for camera', () => {
      const content = getPermissionContent(MediaSourceType.camera)

      expect(content.benefits).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            icon: 'camera-alt',
            title: 'Capture Objects',
          }),
          expect.objectContaining({
            icon: 'auto-stories',
            title: 'AI-Generated Narratives',
          }),
          expect.objectContaining({
            icon: 'headphones',
            title: 'Audio Tours',
          }),
        ]),
      )
    })

    it('should include expected benefits for library', () => {
      const content = getPermissionContent(MediaSourceType.library)

      expect(content.benefits).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            icon: 'camera-alt',
            title: 'Capture Objects',
          }),
          expect.objectContaining({
            icon: 'auto-stories',
            title: 'AI-Generated Narratives',
          }),
          expect.objectContaining({
            icon: 'headphones',
            title: 'Audio Tours',
          }),
        ]),
      )
    })

    it('should return benefits with required string properties', () => {
      const content = getPermissionContent(MediaSourceType.camera)

      const allBenefitsValid = content.benefits.every(validateBenefit)

      expect(allBenefitsValid).toBe(true)
    })
  })
})

/**
 * validateBenefit
 * Helper to validate benefit properties
 */
const validateBenefit = (benefit: {
  icon: string
  title: string
  description: string
}): boolean => {
  return (
    typeof benefit.icon === 'string' &&
    typeof benefit.title === 'string' &&
    typeof benefit.description === 'string'
  )
}
