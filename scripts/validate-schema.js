/**
 * mock global variables
 */
global.window = {
  insights: {
    chrome: {
      isBeta: () => false,
      getEnvironment: () => 'prod',
    },
  },
};

const { get, join } = require('lodash');
const Joi = require('joi');
const { default: getAppsData } = require('../src/contentApi/get-apps-data');

const permissionMethods = [
  'isOrgAdmin',
  'isActive',
  'isInternal',
  'isEntitled',
  'isNotEntitled',
  'isProd',
  'isBeta',
  'loosePermissions',
  'hasPermissions',
  'hasLocalStorage',
  'hasCookie',
  'apiRequest',
];

const icons = [
  'insights',
  'ansible',
  'lightbulb',
  'error',
  'list',
  'history',
  'cog',
  'play',
  'unknown',
  'download',
];

const states = ['error', 'warning', 'info', 'success'];

const permissionSchema = Joi.object({
  method: Joi.string()
    .valid(...permissionMethods)
    .required(),
  args: Joi.array(),
});

const conditionSchema = Joi.object({
  when: Joi.string().required(),
  is: Joi.any(),
  isNot: Joi.any(),
});

const translatedStringSchema = Joi.alternatives(
  Joi.string(),
  Joi.object({
    id: Joi.string().required(),
    defaultMessage: Joi.string().required(),
  })
);

const estateItemSchema = Joi.object({
  id: Joi.string().required(),
  url: Joi.string().required(),
  accessor: Joi.string(),
  method: Joi.string().valid('get', 'post'),
  args: Joi.array(),
  condition: conditionSchema,
  shape: Joi.object({
    title: Joi.string().required(),
    href: Joi.string(),
    section: Joi.string(),
  }).required(),
  permissions: Joi.array().items(permissionSchema),
  errorProcessor: Joi.func(),
});

const estateSectionSchema = Joi.object({
  section: Joi.string(),
  items: Joi.array().items(estateItemSchema).required(),
});

const recommendationItemSchema = Joi.object({
  id: Joi.string().required(),
  title: translatedStringSchema.required(),
  condition: conditionSchema,
  url: Joi.string(),
  accessor: Joi.string(),
  icon: Joi.string().valid(...icons),
  state: Joi.string().valid(...states),
  permissions: Joi.array().items(permissionSchema),
  action: Joi.object({
    href: Joi.string().required(),
    title: Joi.string().required(),
    external: Joi.bool(),
  }).required(),
});

const configTryLearnSchema = Joi.object({
  id: Joi.string(),
  url: Joi.string(),
  responseProcessor: Joi.func(),
  accessor: Joi.string(),
  permissions: Joi.array().items(permissionSchema),
  shape: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    link: Joi.object({
      title: Joi.string().required(),
      href: Joi.string().required(),
      external: Joi.bool(),
    }).required(),
  }).required(),
});

const schema = Joi.object({
  firstPanel: Joi.array().items(estateSectionSchema).required(),
  secondPanel: Joi.object({
    recs: Joi.array().items(recommendationItemSchema),
    openshift: Joi.array().items(recommendationItemSchema),
    rhel: Joi.array().items(recommendationItemSchema),
  }).required(),
  configTryLearn: Joi.object({
    configure: Joi.array().items(configTryLearnSchema).required(),
    try: Joi.array().items(configTryLearnSchema).required(),
    learn: Joi.array().items(configTryLearnSchema).required(),
  }).required(),
});

function validateConfig(config) {
  const { error, value } = schema.validate(config);
  if (error) {
    let accessor = error.details[0]?.path;
    if (accessor.length > 1) {
      accessor.pop();
    }
    console.error('Error: invalid schema\n');
    if (accessor.length > 0) {
      console.error('Invalid object: ', get(value, accessor));
    }
    console.log(JSON.stringify(error.details, null, 2));
    throw error;
  }
}

const configs = getAppsData();

try {
  configs.forEach((c) => {
    validateConfig(c);
  });
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
