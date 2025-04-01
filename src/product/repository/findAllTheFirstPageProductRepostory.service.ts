import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';

@Injectable()
export class FindAllTheFirstPageProductRepostory {
  constructor(
    private readonly prisma: PrismaService,

    private readonly envConfig: EnvConfigService,
  ) {}

  async findAllTheFirstPage() {
    return await this.prisma.product
      .findMany({
        select: {
          id: true,
          name: true,
          price: true,
          available: true,
          category: true,
          description: true,
          image_url: true,
          stock: true,
        },
        skip: 0,
        take: this.envConfig.getItensPerPage(),
        orderBy: {
          name: 'asc',
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException([
          'Error ao buscar primeira pagina de produtos',
        ]);
      });
  }
}
