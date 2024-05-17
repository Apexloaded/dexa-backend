export const FeedsABI = [
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'gnfdId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'remintToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'remintPrice',
        type: 'uint256',
      },
    ],
    name: 'PostMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'reminter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
    ],
    name: 'Reminted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'offChainId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tippedToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tipId',
        type: 'uint256',
      },
    ],
    name: 'Tipped',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'TokenAdded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CREATOR_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEXA_CREATOR_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEXA_FEEDS_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEXA_STORAGE_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ERROR_DUPLICATE_RESOURCE',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ERROR_INVALID_PRICE',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ERROR_INVALID_STRING',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ERROR_NOT_FOUND',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ERROR_PROCESS_FAILED',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ERROR_UNAUTHORISED_ACCESS',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: '_allowedTokens',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'tokenAddress',
        type: 'address[]',
      },
    ],
    name: 'addTokenToWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dexaCreator',
    outputs: [
      {
        internalType: 'contract DexaCreator',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feedsToken',
    outputs: [
      {
        internalType: 'contract FeedsToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'getAllCreatorTips',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'postId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tipSent',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tipReceived',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
        ],
        internalType: 'struct Tips[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'getCreatorTipsByToken',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'postId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tipSent',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tipReceived',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
        ],
        internalType: 'struct Tips[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
    ],
    name: 'getPost',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'address payable',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'remintPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remintCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'remintedBy',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'remintToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tipCount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'url',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'mimetype',
                type: 'string',
              },
            ],
            internalType: 'struct Media[]',
            name: 'media',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'metadataURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'username',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'pfp',
                type: 'string',
              },
            ],
            internalType: 'struct PostCreator',
            name: 'creator',
            type: 'tuple',
          },
        ],
        internalType: 'struct Post',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'gnfdId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'init_dexa_base',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_dexaCreator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_feedsTokenAddr',
        type: 'address',
      },
    ],
    name: 'init_dexa_feed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dexaCreator',
        type: 'address',
      },
    ],
    name: 'init_roles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'listAllPosts',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'address payable',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'remintPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remintCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'remintedBy',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'remintToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tipCount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'url',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'mimetype',
                type: 'string',
              },
            ],
            internalType: 'struct Media[]',
            name: 'media',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'metadataURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'username',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'pfp',
                type: 'string',
              },
            ],
            internalType: 'struct PostCreator',
            name: 'creator',
            type: 'tuple',
          },
        ],
        internalType: 'struct Post[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'tokenId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'metadataURI',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'url',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'mimetype',
            type: 'string',
          },
        ],
        internalType: 'struct Media[]',
        name: 'media',
        type: 'tuple[]',
      },
    ],
    name: 'mintPost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'postByCreator',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'address payable',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'remintPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remintCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'remintedBy',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'remintToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tipCount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'url',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'mimetype',
                type: 'string',
              },
            ],
            internalType: 'struct Media[]',
            name: 'media',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'metadataURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'username',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'pfp',
                type: 'string',
              },
            ],
            internalType: 'struct PostCreator',
            name: 'creator',
            type: 'tuple',
          },
        ],
        internalType: 'struct Post[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
    ],
    name: 'postBygnfdId',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'address payable',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'remintPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remintCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'remintedBy',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'remintToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tipCount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'url',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'mimetype',
                type: 'string',
              },
            ],
            internalType: 'struct Media[]',
            name: 'media',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'metadataURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'username',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'pfp',
                type: 'string',
              },
            ],
            internalType: 'struct PostCreator',
            name: 'creator',
            type: 'tuple',
          },
        ],
        internalType: 'struct Post',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'postCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'postMedia',
    outputs: [
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'mimetype',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'remintPost',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_feeRate',
        type: 'uint256',
      },
    ],
    name: 'setAdminFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tipAmount',
        type: 'uint256',
      },
    ],
    name: 'tipPost',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tipsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
