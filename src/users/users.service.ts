import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';




@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) { }
    async register(createUserDto: CreateUserDto) {
        const loc = await this.httpService.axiosRef.get(`https://geocode.maps.co/search?q=${createUserDto.zipCode}+${createUserDto.pays}`)
        const lat = loc.data[1].lat;
        const lon = loc.data[1].lon;
        console.log("loc", lat, lon);
        
        const user = new User();
        user.mail = createUserDto.mail;
        user.nom = createUserDto.nom;
        user.prenom = createUserDto.prenom;
        user.username = createUserDto.username;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        user.adress_line = createUserDto.adress_line;
        user.zipCode = createUserDto.zipCode;
        user.city = createUserDto.city;
        user.region = createUserDto.region;
        user.departement = createUserDto.departement;
        user.pays = createUserDto.pays;
        user.latitude = lat
        user.longitude = lon

        await User.save(user);
        return user;
    }

    async findAll(): Promise<User[] | undefined> {
        const data = await User.find({
            relations: {
                langage: true,
                competence: true,
            },
            select: {
                nom: true,
                prenom: true,
                city: true,
                departement: true,
                region: true,
            },
        });
        if (data[0]) {
            return data;
        }
    }


    async findOne(id: number) {
        const rechercheId = await User.findOneBy({ id: id });
        return rechercheId;
    }


    async findOneMail(mail: string) {
        return await User.findOneBy({ mail: mail });
    }


    async findOneUsername(username: string) {
        return await User.findOneBy({ username: username });
    }


    async update(id: number, updateUserDto: UpdateUserDto) {
        await User.update(id, updateUserDto);
        const updateUser = User.findOneBy({ id: id });
        return updateUser;
    }


    async remove(id: number) {
        const deleteUser = await User.findOneBy({ id: id });
        User.remove(deleteUser);
        return deleteUser;
    }
}
