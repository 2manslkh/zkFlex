import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractMode,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
} from '@wagmi/core'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Foo
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fooABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'id',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TestContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const testContractABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'payable', type: 'function', inputs: [], name: 'deposit', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'withdraw', outputs: [] },
] as const

/**
 *
 */
export const testContractAddress = {
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
} as const

/**
 *
 */
export const testContractConfig = { address: testContractAddress, abi: testContractABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link fooABI}__.
 */
export function getFoo(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: fooABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link fooABI}__.
 */
export function readFoo<
  TAbi extends readonly unknown[] = typeof fooABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({ abi: fooABI, ...config } as unknown as ReadContractConfig<
    TAbi,
    TFunctionName
  >)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link testContractABI}__.
 *
 *
 */
export function getTestContract(
  config: Omit<GetContractArgs, 'abi' | 'address'> & { chainId?: keyof typeof testContractAddress },
) {
  return getContract({ abi: testContractABI, address: testContractAddress[31337], ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testContractABI}__.
 *
 *
 */
export function readTestContract<
  TAbi extends readonly unknown[] = typeof testContractABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof testContractAddress
  },
) {
  return readContract({
    abi: testContractABI,
    address: testContractAddress[31337],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link testContractABI}__.
 *
 *
 */
export function writeTestContract<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof testContractAddress,
>(
  config:
    | (Omit<WriteContractPreparedArgs<typeof testContractABI, TFunctionName>, 'abi' | 'address'> & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof testContractAddress
      })
    | (Omit<
        WriteContractUnpreparedArgs<typeof testContractABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof testContractAddress
      }),
) {
  return writeContract({
    abi: testContractABI,
    address: testContractAddress[31337],
    ...config,
  } as unknown as WriteContractArgs<typeof testContractABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link testContractABI}__.
 *
 *
 */
export function prepareWriteTestContract<
  TAbi extends readonly unknown[] = typeof testContractABI,
  TFunctionName extends string = string,
>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof testContractAddress
  },
) {
  return prepareWriteContract({
    abi: testContractABI,
    address: testContractAddress[31337],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}
