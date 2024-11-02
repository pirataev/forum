/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { TopicService } from "../topic.service";
import { TopicCreateInput } from "./TopicCreateInput";
import { Topic } from "./Topic";
import { TopicFindManyArgs } from "./TopicFindManyArgs";
import { TopicWhereUniqueInput } from "./TopicWhereUniqueInput";
import { TopicUpdateInput } from "./TopicUpdateInput";

export class TopicControllerBase {
  constructor(protected readonly service: TopicService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Topic })
  async createTopic(@common.Body() data: TopicCreateInput): Promise<Topic> {
    return await this.service.createTopic({
      data: data,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Topic] })
  @ApiNestedQuery(TopicFindManyArgs)
  async topics(@common.Req() request: Request): Promise<Topic[]> {
    const args = plainToClass(TopicFindManyArgs, request.query);
    return this.service.topics({
      ...args,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Topic })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async topic(
    @common.Param() params: TopicWhereUniqueInput
  ): Promise<Topic | null> {
    const result = await this.service.topic({
      where: params,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Topic })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateTopic(
    @common.Param() params: TopicWhereUniqueInput,
    @common.Body() data: TopicUpdateInput
  ): Promise<Topic | null> {
    try {
      return await this.service.updateTopic({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Topic })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteTopic(
    @common.Param() params: TopicWhereUniqueInput
  ): Promise<Topic | null> {
    try {
      return await this.service.deleteTopic({
        where: params,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}