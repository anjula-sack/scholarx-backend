import { dataSource } from '../configs/dbConfig'
import Profile from '../entities/profile.entity'
import { ProfileTypes } from '../enums'
import { getAllUsers } from './admin.service'

jest.mock('../configs/dbConfig', () => ({
  dataSource: {
    getRepository: jest.fn()
  }
}))

describe('getAllUsers', () => {
  it('should get all users successfully', async () => {
    const mockUser1 = new Profile(
      'user1@example.com',
      'contact1@example.com',
      'User1',
      'Last1',
      'image1.jpg',
      'linkedin1',
      ProfileTypes.DEFAULT,
      'hashedPassword1'
    )

    const mockUser2 = new Profile(
      'user2@example.com',
      'contact2@example.com',
      'User2',
      'Last2',
      'image2.jpg',
      'linkedin2',
      ProfileTypes.ADMIN,
      'hashedPassword2'
    )
    const mockProfileRepository = {
      find: jest.fn().mockResolvedValue([mockUser1, mockUser2])
    }
    ;(dataSource.getRepository as jest.Mock).mockReturnValueOnce(
      mockProfileRepository
    )
    const result = await getAllUsers()
    expect(result).toEqual([mockUser1, mockUser2])
  })

  it('should handle an empty user list', async () => {
    const mockProfileRepository = {
      find: jest.fn().mockResolvedValue([])
    }
    ;(dataSource.getRepository as jest.Mock).mockReturnValueOnce(
      mockProfileRepository
    )
    const result = await getAllUsers()
    expect(result).toEqual([])
  })
})