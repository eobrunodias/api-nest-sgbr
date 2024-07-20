import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Place } from "./entities/place.entity";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
  ) {}

  //TODO: colocar async nos metodos
  create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placesRepository.create(createPlaceDto);
    return this.placesRepository.save(place);
  }

  findAll(): Promise<Place[]> {
    return this.placesRepository.find();
  }

  async findOne(id: number): Promise<Place> {
    const place = await this.placesRepository.findOne({ where: { id } });

    if (!place) {
      throw new NotFoundException("Place not found");
    }

    return place;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    let place = await this.placesRepository.findOne({ where: { id } });

    if (!place) {
      throw new NotFoundException("Place not found");
    }

    place = this.placesRepository.merge(place, updatePlaceDto);

    await this.placesRepository.save(place);
    return place;
  }

  async remove(id: number): Promise<void> {
    const place = await this.placesRepository.findOne({ where: { id } });

    if (!place) {
      throw new NotFoundException("Place not found");
    }

    await this.placesRepository.delete(id);
  }
}
