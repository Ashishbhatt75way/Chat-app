import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import * as groupServices from "./group.services";

export const getAllGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.getAllGroup();
  res.send(createResponse(result, "Groups fetched successfully"));
});

export const getGroupById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await groupServices.getGroupById(req.params.id);
    res.send(createResponse(result, "Group fetched successfully"));
  }
);

export const createGroup = asyncHandler(async (req: Request, res: Response) => {
  const { adminId } = req.body;
  const result = await groupServices.createGroup(req.body, adminId);
  res.send(createResponse(result, "group created successfully"));
});

export const updateGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.updateGroup(req.params.id, req.body);
  res.send(createResponse(result, "group updated successfully"));
});

export const deleteGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.deleteGroup(req.params.id);
  res.send(createResponse(result, "group deleted successfully"));
});

export const addMembers = asyncHandler(async (req: Request, res: Response) => {
  const { memberId, adminId } = req.body;
  const result = await groupServices.addMembers(
    req.params.id,
    adminId,
    memberId
  );
  res.send(createResponse(result, "Members added successfully"));
});

export const makeAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { adminId, memberId } = req.body;
  const result = await groupServices.makeAdmin(
    req.params.id,
    adminId,
    memberId
  );
  res.send(createResponse(result, "Admin added successfully"));
});

export const removeAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { adminId } = req.body;
  const result = await groupServices.removeAdmin(req.params.id, adminId);
  res.send(createResponse(result, "Admin removed successfully"));
});

export const joinGroup = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const result = await groupServices.joinGroup(req.params.id, userId);
  res.send(createResponse(result, "Group joined successfully"));
});

export const getJoinedGroups = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await groupServices.getJoinedGroups(req.user?._id!);
    res.send(createResponse(result));
  }
);

export const requestToJoin = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.requestToJoinGroup(req.params.id, req.user?._id!);
  res.send(createResponse(result, "Request sent successfully"));
});

export const approveRequest = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.approveJoinRequest(req.params.id, req.user?._id!, req.body.userId);
  res.send(createResponse(result, "Request approved successfully"));
});

export const declineRequest = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.declineJoinRequest(req.params.id, req.user?._id!, req.body.userId);
  res.send(createResponse(result, "Request declined"));
});

export const getJoinRequests = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.getPendingJoinRequests(req.user?._id!);
  res.send(createResponse(result, "Request fetched successfully"));
});