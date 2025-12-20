import {KNOWN_MUSEUMS, type MuseumLocation} from './museums'

describe('KNOWN_MUSEUMS', () => {
  describe('structure', () => {
    it('should be an array', () => {
      expect(Array.isArray(KNOWN_MUSEUMS)).toBe(true)
    })

    it('should not be empty', () => {
      expect(KNOWN_MUSEUMS.length).toBeGreaterThan(0)
    })

    it('should contain museum objects', () => {
      expect(KNOWN_MUSEUMS.every(museum => typeof museum === 'object')).toBe(true)
    })
  })

  describe('museum properties', () => {
    it('should have all required properties for each museum', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(museum).toHaveProperty('id')
        expect(museum).toHaveProperty('name')
        expect(museum).toHaveProperty('province')
        expect(museum).toHaveProperty('address')
        expect(museum).toHaveProperty('website')
        expect(museum).toHaveProperty('coords')
      })
    })

    it('should have valid string properties', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(typeof museum.id).toBe('string')
        expect(typeof museum.name).toBe('string')
        expect(typeof museum.province).toBe('string')
        expect(typeof museum.address).toBe('string')
        expect(typeof museum.website).toBe('string')

        expect(museum.id.length).toBeGreaterThan(0)
        expect(museum.name.length).toBeGreaterThan(0)
        expect(museum.province.length).toBeGreaterThan(0)
        expect(museum.address.length).toBeGreaterThan(0)
        expect(museum.website.length).toBeGreaterThan(0)
      })
    })

    it('should have valid coordinates', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(museum.coords).toHaveProperty('latitude')
        expect(museum.coords).toHaveProperty('longitude')
        expect(typeof museum.coords.latitude).toBe('number')
        expect(typeof museum.coords.longitude).toBe('number')
      })
    })

    it('should have valid latitude values (Netherlands range)', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        // Netherlands latitude range approximately 50.7° to 53.5°
        expect(museum.coords.latitude).toBeGreaterThanOrEqual(50)
        expect(museum.coords.latitude).toBeLessThanOrEqual(54)
      })
    })

    it('should have valid longitude values (Netherlands range)', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        // Netherlands longitude range approximately 3.3° to 7.2°
        expect(museum.coords.longitude).toBeGreaterThanOrEqual(3)
        expect(museum.coords.longitude).toBeLessThanOrEqual(8)
      })
    })

    it('should have valid website URLs', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(museum.website).toMatch(/^https?:\/\//)
      })
    })
  })

  describe('specific museums', () => {
    it('should contain Rijksmuseum', () => {
      const rijksmuseum = KNOWN_MUSEUMS.find(m => m.id === 'rijksmuseum')
      expect(rijksmuseum).toBeDefined()
      expect(rijksmuseum?.name).toBe('Rijksmuseum')
      expect(rijksmuseum?.province).toBe('North Holland')
    })

    it('should contain Van Gogh Museum', () => {
      const vanGogh = KNOWN_MUSEUMS.find(m => m.id === 'van-gogh-museum')
      expect(vanGogh).toBeDefined()
      expect(vanGogh?.name).toBe('Van Gogh Museum')
    })

    it('should contain Anne Frank House', () => {
      const anneFrank = KNOWN_MUSEUMS.find(m => m.id === 'anne-frank-house')
      expect(anneFrank).toBeDefined()
      expect(anneFrank?.name).toBe('Anne Frank House')
    })

    it('should contain Mauritshuis', () => {
      const mauritshuis = KNOWN_MUSEUMS.find(m => m.id === 'mauritshuis')
      expect(mauritshuis).toBeDefined()
      expect(mauritshuis?.province).toBe('South Holland')
    })
  })

  describe('data integrity', () => {
    it('should have unique IDs', () => {
      const ids = KNOWN_MUSEUMS.map(m => m.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid province names', () => {
      const validProvinces = [
        'North Holland',
        'South Holland',
        'Utrecht',
        'Gelderland',
        'Overijssel',
        'Drenthe',
        'Friesland',
        'Groningen',
        'Zeeland',
        'North Brabant',
        'Limburg',
        'Flevoland',
        'North Holland (Amstelveen)',
      ]

      KNOWN_MUSEUMS.forEach(museum => {
        expect(validProvinces).toContain(museum.province)
      })
    })

    it('should not have distance property by default', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(museum.distance).toBeUndefined()
      })
    })
  })

  describe('coverage', () => {
    it('should include museums from multiple provinces', () => {
      const provinces = new Set(KNOWN_MUSEUMS.map(m => m.province))
      expect(provinces.size).toBeGreaterThan(5)
    })

    it('should include museums in Amsterdam', () => {
      const amsterdamMuseums = KNOWN_MUSEUMS.filter(m => m.address.includes('Amsterdam'))
      expect(amsterdamMuseums.length).toBeGreaterThan(5)
    })

    it('should include museums in Den Haag', () => {
      const denHaagMuseums = KNOWN_MUSEUMS.filter(m => m.address.includes('Den Haag'))
      expect(denHaagMuseums.length).toBeGreaterThan(3)
    })

    it('should include museums in Rotterdam', () => {
      const rotterdamMuseums = KNOWN_MUSEUMS.filter(m => m.address.includes('Rotterdam'))
      expect(rotterdamMuseums.length).toBeGreaterThan(0)
    })
  })

  describe('type safety', () => {
    it('should match MuseumLocation type', () => {
      const museum: MuseumLocation = KNOWN_MUSEUMS[0]

      expect(museum.id).toBeDefined()
      expect(museum.name).toBeDefined()
      expect(museum.province).toBeDefined()
      expect(museum.address).toBeDefined()
      expect(museum.website).toBeDefined()
      expect(museum.coords).toBeDefined()
    })

    it('should support optional distance property', () => {
      const museumWithDistance: MuseumLocation = {
        ...KNOWN_MUSEUMS[0],
        distance: 1500,
      }

      expect(museumWithDistance.distance).toBe(1500)
    })
  })

  describe('edge cases', () => {
    it('should not contain empty strings', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(museum.id).not.toBe('')
        expect(museum.name).not.toBe('')
        expect(museum.province).not.toBe('')
        expect(museum.address).not.toBe('')
        expect(museum.website).not.toBe('')
      })
    })

    it('should have reasonable number of museums', () => {
      expect(KNOWN_MUSEUMS.length).toBeGreaterThan(20)
      expect(KNOWN_MUSEUMS.length).toBeLessThan(100)
    })

    it('should not have NaN coordinates', () => {
      KNOWN_MUSEUMS.forEach(museum => {
        expect(Number.isNaN(museum.coords.latitude)).toBe(false)
        expect(Number.isNaN(museum.coords.longitude)).toBe(false)
      })
    })
  })
})
