import { useEffect } from "react";
import { ChainId,
  useNetworkMismatch,
  useSwitchChain,
  ConnectWallet,
  useAddress,
} from "@thirdweb-dev/react";
import CustomButton from "./CustomButton";
import { useNavigate } from 'react-router-dom';

export const AutoConnect = () => {
    const address = useAddress(); // Get connected wallet address
    const switchChain = useSwitchChain(); // Switch to desired chain
    const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
    const navigate = useNavigate()
    
    useEffect(() => {
      // Check if the user is connected to the wrong network
      if (isMismatched) {
        // Prompt their wallet to switch networks
        switchChain(ChainId.LineaTestnet); // the chain you want here
      }
    }, [address]); // This above block gets run every time "address" changes (e.g. when the user connects)

    return (
      <>
        {!isMismatched && 
          <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
          }}
        />
        }
        
        <ConnectWallet/>
      </>
    )
  };