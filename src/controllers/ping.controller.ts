import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
} from '@loopback/rest';
import { ClassDecoratorFactory, MetadataInspector } from '@loopback/metadata';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

interface MyclassMetaData {
  name: string;
}
function myClassDecorator(spec: MyclassMetaData): ClassDecorator{
  const factory = new ClassDecoratorFactory<MyclassMetaData>(
       'metadata-data-my-class-decorator',
      spec
  )
  return factory.create()

}

/**
 * A simple controller to bounce back http requests
 */

@myClassDecorator({name: 'Gardene'})
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello preto',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}

const meta = MetadataInspector.getClassMetadata<MyclassMetaData>(
  'metadata-data-my-class-decorator',
  PingController
)
console.log(meta)
