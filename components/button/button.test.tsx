import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Button } from './button';

describe('Button component', () => {
  it('should render button', () => {
    const { getByText } = render(<Button label="test" onPress={() => null} />)
    expect(getByText('test')).toBeTruthy()
  })
  it('should call action on press', () => {
    const mockFn = jest.fn()
    const { getByText } = render(<Button label="test" onPress={mockFn} />)
    const button = getByText('test')
    fireEvent.press(button)
    expect(mockFn.mock.calls.length).toBe(1)
  })
})