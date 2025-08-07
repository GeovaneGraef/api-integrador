import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub, Subscription } from '@google-cloud/pubsub';
import { ProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @Inject('PUB_SUB') private readonly pubSubClient: PubSub,
    private readonly configService: ConfigService,
  ) {
    this.logger.log(`PubSub client ready.`);
  }

  async testConnection(topicName): Promise<void> {
    const message = {
      testMessage: 'Test NestJS',
      timestamp: new Date().toISOString(),
    };

    const dataBuffer = Buffer.from(JSON.stringify(message));

    try {
      this.logger.log(`Attempting to publish a test message to topic: ${topicName}`);
      const topic = this.pubSubClient.topic(topicName);

      const messageId = await topic.publishMessage({
        data: dataBuffer,
      });

      this.logger.log(`Test message published successfully! Message ID: ${messageId}`);
    } catch (error) {
      this.logger.error(`Failed to publish a message to topic: ${topicName}`);
      this.logger.error('Error details:', error.message, error.stack);
      throw error;
    }
  }

  // async sendDataMessages(data: ProductDto[]): Promise<any> {
  //   this.logger.log('Enviando para fila de processamento');
  //   const topicName = 'PRODUTOS_SAP';
  //   const topic = this.pubSubClient.topic(topicName);

  //   try {
  //     const messageId = await topic.publishMessage({
  //       data: Buffer.from(JSON.stringify(data)),
  //     });
  //     this.logger.log(`Mensagem ${messageId} publicada no tópico ${topicName}`);
  //   } catch (error) {
  //     this.logger.error(`Falha ao publicar mensagem: ${error.message}`);
  //     throw error;
  //   }

  //   return 'Dados processados e mensagem publicada com sucesso.';
  // }

  // // Método para consumir a fila
  // getProductsMessage() {
  //   /**
  //    *
  //    * Lógica inicial para o pubsub (EM CONSTRUÇÃO)
  //    *
  //    */
  //   // const subscriptionName = 'PRODUTOS_SAP';
  //   // this.subscription = this.pubSubClient.subscription(subscriptionName);
  //   // this.subscription.on('message', (message) => {
  //   //   this.logger.log(`Mensagem recebida: ${message.id}`);
  //   //   try {
  //   //     const payload = JSON.parse(message.data.toString());
  //   //     this.logger.log(`Payload: ${JSON.stringify(payload)}`);
  //   //     message.ack();
  //   //     this.logger.log(`Mensagem ${message.id} reconhecida e processada.`);
  //   //   } catch (error) {
  //   //     this.logger.error(`Falha ao processar mensagem ${message.id}: ${error.message}`);
  //   //   }
  //   // });
  //   // this.subscription.on('error', (error) => {
  //   //   this.logger.error(`Erro na assinatura do PubSub: ${error.message}`);
  //   // });
  //   // this.logger.log(`Ouvindo a fila '${subscriptionName}'...`);

  //   return {
  //     id: 11946,
  //     codSelcon: null,
  //     codBarra: '7898024050476',
  //     tipo: 'P',
  //     tipoServico: null,
  //     descricao: 'STP OILTREATMENT 450ML',
  //     unidade: {
  //       sigla: 'UN',
  //       descricao: 'UN',
  //     },
  //     subcategoria: {
  //       id: 20001202,
  //       descricao: 'MOTOR',
  //       categoria: {
  //         id: 20001200,
  //         descricao: 'ADITIVOS CAMINHOES EONIBUS',
  //       },
  //     },
  //     marca: 'STP',
  //     dtaCadastro: null,
  //     ncm: '38111900',
  //     cest: '2804300',
  //     cfop: [
  //       {
  //         uf: 'PR',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'PR',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'F',
  //       },
  //       {
  //         uf: 'RS',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'RS',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'F',
  //       },
  //       {
  //         uf: 'SC',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'F',
  //       },
  //       {
  //         uf: 'SC',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'SP',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'F',
  //       },
  //       {
  //         uf: 'SP',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'F',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'PR',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'V',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'RS',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'V',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'SC',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'V',
  //         origem: 'D',
  //       },
  //       {
  //         uf: 'SP',
  //         codigo: 5102,
  //         nop: null,
  //         tipo: 'V',
  //         origem: 'D',
  //       },
  //     ],
  //     solicitaVendedor: true,
  //     anp: null,
  //     combustivel: false,
  //     tributacoes: [
  //       {
  //         cnpj: null,
  //         uf: 'PR',
  //         tipo: 'ICMS',
  //         cst: '000',
  //         aliquota: 19.5,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: ' ',
  //       },
  //       {
  //         cnpj: null,
  //         uf: 'PR',
  //         tipo: 'IPI',
  //         cst: '99',
  //         aliquota: 0.0,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: '',
  //       },
  //       {
  //         cnpj: null,
  //         uf: 'RS',
  //         tipo: 'IPI',
  //         cst: '99',
  //         aliquota: 0.0,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: '',
  //       },
  //       {
  //         cnpj: null,
  //         uf: 'RS',
  //         tipo: 'ICMS',
  //         cst: '000',
  //         aliquota: 17.0,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: ' ',
  //       },
  //       {
  //         cnpj: null,
  //         uf: 'SC',
  //         tipo: 'ICMS',
  //         cst: '000',
  //         aliquota: 17.0,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: ' ',
  //       },
  //       {
  //         cnpj: null,
  //         uf: 'SP',
  //         tipo: 'ICMS',
  //         cst: '000',
  //         aliquota: 18.0,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: ' ',
  //       },
  //       {
  //         cnpj: null,
  //         uf: 'SP',
  //         tipo: 'IPI',
  //         cst: '99',
  //         aliquota: 0.0,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: '',
  //       },
  //       {
  //         cnpj: '07473735000181',
  //         uf: null,
  //         tipo: 'COFINS',
  //         cst: '01',
  //         aliquota: 7.6,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: '101',
  //       },
  //       {
  //         cnpj: '07473735000181',
  //         uf: null,
  //         tipo: 'PIS',
  //         cst: '01',
  //         aliquota: 1.65,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: '101',
  //       },
  //       {
  //         cnpj: '07473735000262',
  //         uf: null,
  //         tipo: 'COFINS',
  //         cst: '01',
  //         aliquota: 7.6,
  //         reducao: 0.0,
  //         aliqDesoneracao: 0.0,
  //         codNatReceita: '101',
  //       },
  //     ],
  //     escalaRelevante: true,
  //     cnpjFabricante: '',
  //     nomeFabricante: '',
  //     perGLP: 0.0,
  //     perGNNacional: 0.0,
  //     perGNImportado: 0.0,
  //     cartoesCombustivel: [],
  //     cBenef: [
  //       {
  //         ncm: '19059090',
  //         uf: 'PR',
  //         cst: '051',
  //         codigo: 'PR830001',
  //       },
  //       {
  //         ncm: '19059090',
  //         uf: 'SC',
  //         cst: '020',
  //         codigo: 'SC820030',
  //       },
  //       {
  //         ncm: '19059090',
  //         uf: 'SC',
  //         cst: '051',
  //         codigo: 'SC830073',
  //       },
  //     ],
  //     destacaICMSSt: false,
  //     tribIcmsMonofasica: [],
  //     versao: 18866966,
  //     exclusao: false,
  //     codigoRti: '',
  //   };
  // }
}
