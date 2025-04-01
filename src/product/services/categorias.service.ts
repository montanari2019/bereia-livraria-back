import { Injectable } from '@nestjs/common';
import { CategoriaProductsInterface } from '../interfaces/categoria-produtc.interface';
import { CategoryRepository } from '../repository/categoryRepository.service';
import { CachingCategoriasService } from './cachingCategorias.service';

@Injectable()
export class CategoriasService implements CategoriaProductsInterface {
  constructor(
    private readonly cacheCategoryManager: CachingCategoriasService,
    private categoriaRepository: CategoryRepository,
  ) {}
  async ListarCategorias(): Promise<{ categorias: string[] }> {
    try {
      const cachedData = await this.cacheCategoryManager.getCachingCategorias();
      if (cachedData) {
        return cachedData;
      }

      const categoriaRepository = await this.categoriaRepository.findCategory();

      await this.cacheCategoryManager.createCachingCategory(
        categoriaRepository,
      );

      return categoriaRepository;
    } catch (error) {
      throw error;
    }
  }
}
