import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useWalletConnect } from '../../__mocks__/@walletconnect/react-native-dapp'
import { WalletConnectExperience } from "./wallet-connect-experience";

describe('Mock useWalletConnect', () => {
    beforeEach(() => {
        useWalletConnect.mockReset()
        useWalletConnect.mockReturnValue({
            connected: true,
            connect: jest.fn(),
            killSession: jest.fn(),
            accounts: ['0xe46E079955eBB16dc56a7402d5d176a098fa5BF8'],
            signMessage: jest.fn().mockReturnValue('0x4906ecb67d5e53eb31f7399fe6300d4e6ef854aae4215875c6785a63fb044ea23dc0462a0c41e52776050980d74fe33647b57768a82a8763992f737df23552651b'),
        })

    })
    it('Should show connect button and connect wallet', () => {
        useWalletConnect.mockReturnValueOnce({ connected: false, connect: jest.fn() });
        const { getByTestId } = render(<WalletConnectExperience />)
        const button = getByTestId('connect-button')
        fireEvent.press(button)
        expect(button).toBeTruthy()
        expect(useWalletConnect.mock.results[0].value.connect).toHaveBeenCalledTimes(1)
    })
    it('Should show address', () => {
        const { getByTestId } = render(<WalletConnectExperience />)
        expect(getByTestId('address').props.children).toBe(useWalletConnect.mock.results[0].value.accounts[0])

    })
    it('Should kill session', () => {
        const { getByTestId } = render(<WalletConnectExperience />)
        const button = getByTestId('log-out-button')
        fireEvent.press(button)
        expect(useWalletConnect.mock.results[0].value.killSession).toHaveBeenCalledTimes(1)
    })
    it('Should sign message', async () => {
        const { getByTestId } = render(<WalletConnectExperience />)
        const button = getByTestId('sign-button')
        fireEvent.press(button)
        await waitFor(() => expect(useWalletConnect.mock.results[0].value.signMessage).toHaveBeenCalledTimes(1))
    })
})